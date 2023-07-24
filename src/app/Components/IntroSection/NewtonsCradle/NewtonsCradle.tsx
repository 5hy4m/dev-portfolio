"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createCradle, defaultPositionAndSize, responsive } from "./utils";
import { PositionAndSize } from "./type";
import { useWindowSize } from "@/hooks/useWindowSize";
const {
  Engine,
  Body,
  Runner,
  Render,
  Composite,
  Mouse,
  MouseConstraint,
} = require("matter-js");

function NewtonsCradle() {
  const [width,height] = useWindowSize();

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<any>(null);
  const renderRef = useRef<any>(null);

  const positionAndSize = useRef<PositionAndSize>(defaultPositionAndSize);

  const [canvasPosition, setCanvasPosition] = useState<number>(0);

  const assignSize = useCallback(()=>{
    let cradleXPos = 0;
    if(width > 1500){
      positionAndSize.current.renderFrame = responsive.min1500.renderFrame
      positionAndSize.current.cradle = responsive.min1500.cradle
    }else if(width > 1300){
      positionAndSize.current.renderFrame = responsive.max1500.renderFrame
      positionAndSize.current.cradle = responsive.max1500.cradle
    }else if(width < 1300){
      positionAndSize.current.renderFrame = responsive.max1300.renderFrame
      positionAndSize.current.cradle = responsive.max1300.cradle
    }
    positionAndSize.current.renderFrame.width = width * (66.667/100)

    const containerRect = containerRef.current?.getBoundingClientRect();

    positionAndSize.current.renderFrame.height = 850;

    cradleXPos = width > 1500 ? 600 : 500;
    positionAndSize.current.cradle.xPos =
      cradleXPos - containerRect?.width! / 2;


    const rect = containerRef.current?.getBoundingClientRect()
    
    setCanvasPosition(rect?.right!-width)
  },[width])

  useEffect(() => {
    assignSize();

    const cradleProps = positionAndSize.current.cradle;
    const renderFrame = positionAndSize.current.renderFrame;

    // create an engine
    engineRef.current = Engine.create();

    // create a renderer
    renderRef.current = Render.create({
      canvas: canvasRef.current,
      engine: engineRef.current,
      options: {
        background: "transparent",
        wireframes: false,
        width: renderFrame.width,
        height: renderFrame.height,
        showVelocity: true,
      },
    });

    Render.run(renderRef.current);

    const runner = Runner.create();

    Runner.run(runner, engineRef.current);

    const cradle = createCradle(
      cradleProps.xPos,
      cradleProps.yPos,
      cradleProps.count,
      cradleProps.size,
      cradleProps.length
    );
    Composite.add(engineRef.current.world, cradle);
    Body.translate(cradle.bodies[0], { x: -180, y: -100 });

    const mouse = Mouse.create(renderRef.current.canvas);
    const mouseConstraint = MouseConstraint.create(engineRef.current, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    Composite.add(engineRef.current.world, mouseConstraint);

    renderRef.current.mouse = mouse;

    Render.lookAt(renderRef.current, {
      min: { x: 0, y: 50 },
      max: { x: renderFrame.x, y: renderFrame.y },
    });
  },[assignSize]);

  return (
    <div ref={containerRef} className=" relative h-[550px] flex align-center">
      <canvas
        ref={canvasRef}
        style = {{right: canvasPosition}}
        className={`absolute bottom-0 max-w-[1400px] overflow-hidden`}
        />
    </div>
  );
}

export default NewtonsCradle;

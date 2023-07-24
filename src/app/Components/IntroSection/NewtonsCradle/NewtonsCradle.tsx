"use client";

import React, { useEffect, useRef, useState } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<any>(null);
  const engineRef = useRef<any>(null);
  const renderRef = useRef<any>(null);

  const positionAndSize = useRef<PositionAndSize>(defaultPositionAndSize);

  const [canvasPosition, setCanvasPosition] = useState<string>("");

  const assignSize = (window: Window) => {
    const screenWidth = window.innerWidth!;
    let cradleXPos = 0;
    positionAndSize.current.renderFrame =
      screenWidth > 1500
        ? responsive.min1500.renderFrame
        : responsive.min1200.renderFrame;

    positionAndSize.current.cradle =
      screenWidth > 1500
        ? responsive.min1500.cradle
        : responsive.min1200.cradle;

    const containerRect = containerRef.current?.getBoundingClientRect();

    positionAndSize.current.renderFrame.height = 850;

    cradleXPos = screenWidth > 1500 ? 600 : 500;
    positionAndSize.current.cradle.xPos =
      cradleXPos - containerRect?.width! / 2;

    screenWidth > 1500
      ? setCanvasPosition("right-[-200px]")
      : setCanvasPosition("right-[-100px]");
  };

  const [height, width] = useWindowSize();

  useEffect(() => {
    assignSize(window);

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
  });

  return (
    <div ref={containerRef} className=" relative h-[550px] flex align-center">
      <canvas
        ref={canvasRef}
        className={`absolute bottom-0 ${canvasPosition} canvas-class`}
      ></canvas>
    </div>
  );
}

export default NewtonsCradle;

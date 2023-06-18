"use client";
import React, { useEffect, useRef } from "react";
const {
  Engine,
  Bodies,
  Body,
  Runner,
  Render,
  Composite,
  Composites,
  Constraint,
  Mouse,
  MouseConstraint,
} = require("matter-js");

const createCradle = (
  xx: number,
  yy: number,
  number: number,
  size: number,
  length: number
) => {
  var newtonsCradle = Composite.create({ label: "Newtons Cradle" });

  for (var i = 0; i < number; i++) {
    var separation = 1.9,
      circle = Bodies.circle(xx + i * (size * separation), yy + length, size, {
        inertia: Infinity,
        restitution: 1,
        friction: 0,
        frictionAir: 0,
        slop: size * 0.02,
      }),
      constraint = Constraint.create({
        pointA: { x: xx + i * (size * separation), y: yy },
        bodyB: circle,
      });

    Composite.addBody(newtonsCradle, circle);
    Composite.addConstraint(newtonsCradle, constraint);
  }

  return newtonsCradle;
};

function NewtonsCradle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<any>(null);
  const engineRef = useRef<any>(null);
  const renderRef = useRef<any>(null);

  useEffect(() => {
    // create an engine
    engineRef.current = Engine.create();

    const containerRect = containerRef.current?.getBoundingClientRect();
    console.log(containerRect);

    // create a renderer
    renderRef.current = Render.create({
      canvas: canvasRef.current,
      engine: engineRef.current,
      options: {
        background: "transparent",
        wireframes: false,
        // width: window.innerWidth,
        // height: window.innerHeight,
        width: window.innerWidth / 2,
        height: 400,
        showVelocity: true,
      },
    });

    Render.run(renderRef.current);

    const runner = Runner.create();

    Runner.run(runner, engineRef.current);

    const cradle = createCradle(180, 200, 8, 30, 160);
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
      max: { x: 700, y: 600 },
    });
  });
  return (
    <div ref={containerRef} className="h-full relative flex align-center">
      <canvas
        ref={canvasRef}
        className="left-[-10%] absolute canvas-class"
      ></canvas>
    </div>
  );
}

export default NewtonsCradle;

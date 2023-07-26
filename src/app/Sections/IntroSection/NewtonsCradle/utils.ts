const { Bodies, Composite, Constraint } = require("matter-js");
import { PositionAndSize } from "./type";

export const defaultPositionAndSize: PositionAndSize = {
  renderFrame: { height: 0, width: 0, x: 0, y: 0 },
  cradle: { xPos: 0, yPos: 0, size: 0, length: 0, count: 0 },
  canvas: {
    top: "0",
    left: "200px",
  },
};

export const responsive = {
  min1500: {
    renderFrame: { height: 850, width: 1400, x: 700, y: 600 },
    cradle: { xPos: 0, yPos: 325, size: 25, length: 160, count: 8 },
  },
  max1500: {
    renderFrame: { height: 850, width: 1000, x: 600, y: 650 },
    cradle: { xPos: 0, yPos: 325, size: 25, length: 160, count: 8 },
  },
  max1300: {
    renderFrame: { height: 600, width: 900, x: 1400, y: 2000 },
    cradle: { xPos: 0, yPos: 425, size: 80, length: 600, count: 8 },
  },
};

export const createCradle = (
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

/* The function that will run when the events are triggered. */
export const handleScrollOnCanvas = (e: any) => {
  /* The flag that determines whether the wheel event is supported. */
  let supportsWheel = false;
  /* Check whether the wheel event is supported. */
  if (e.type == "wheel") supportsWheel = true;
  else if (supportsWheel) return;

  /* Determine the direction of the scroll (< 0 → up, > 0 → down). */
  const delta = (e.deltaY || -e.wheelDelta || e.detail) >> 10 || 1;

  /* ... */
  window.scrollTo(window.scrollX + delta * 15, window.scrollY + delta * 15);
};

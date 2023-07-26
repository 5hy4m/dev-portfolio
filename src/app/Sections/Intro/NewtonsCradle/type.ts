export type PositionAndSize = {
  renderFrame: { height: number; width: number; x: number; y: number };
  cradle: {
    xPos: number;
    yPos: number;
    size: number;
    length: number;
    count: number;
  };
  canvas: CanvasProps;
};

export type CanvasProps = {
  top: string;
  left: string;
};

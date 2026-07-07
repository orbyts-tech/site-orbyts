export type DotGridParameters = {
  size: number;
  radius: number;
  proximity: number;
  growth: number;
  ease: number;
};

export const DOT_GRID_PARAMETERS: DotGridParameters = {
  size: 30,
  radius: 1,
  proximity: 125,
  growth: 60,
  ease: 0.075,
};

class Point {
  constructor(
    public x: number,
    public y: number,
  ) {}
}

export class DotGridCircle {
  radius: number;
  growthValue = 0;

  constructor(
    public readonly baseRadius: number,
    public readonly position: Point,
  ) {
    this.radius = baseRadius;
  }

  draw(context: CanvasRenderingContext2D, ease: number, growthMax: number): void {
    this.radius += (this.baseRadius + this.growthValue - this.radius) * ease;

    const growthRatio = growthMax > 0 ? this.growthValue / growthMax : 0;
    const alpha = 0.035 + growthRatio * 0.62;
    const greenLightMix = growthRatio * 0.35;

    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = `rgba(${51 + greenLightMix * 18}, ${154 + greenLightMix * 22}, ${98 + greenLightMix * 17}, ${alpha})`;
    context.fill();
  }

  setGrowth(value: number): void {
    this.growthValue = value;
  }

  get x(): number {
    return this.position.x;
  }

  get y(): number {
    return this.position.y;
  }
}

function normalize(value: number, min: number, max: number): number {
  return (value - min) / (max - min);
}

function interpolate(value: number, min: number, max: number): number {
  return min + (max - min) * value;
}

export function mapValue(value: number, min1: number, max1: number, min2: number, max2: number): number {
  return interpolate(normalize(value, min1, max1), min2, max2);
}

export function buildDotGrid(width: number, height: number, parameters: DotGridParameters): DotGridCircle[] {
  const circles: DotGridCircle[] = [];
  const columns = Math.ceil(width / parameters.size) + 1;
  const rows = Math.ceil(height / parameters.size) + 1;
  const amount = columns * rows;

  for (let index = 0; index < amount; index += 1) {
    const column = index % columns;
    const row = Math.floor(index / columns);
    circles.push(
      new DotGridCircle(parameters.radius, new Point(parameters.size * column, parameters.size * row)),
    );
  }

  return circles;
}

export function applyProximity(
  circles: DotGridCircle[],
  clientX: number,
  clientY: number,
  parameters: DotGridParameters,
): void {
  for (const circle of circles) {
    const distance = Math.hypot(circle.x - clientX, circle.y - clientY);
    let growth = mapValue(
      distance,
      circle.baseRadius,
      circle.baseRadius + parameters.proximity,
      parameters.growth,
      0,
    );
    if (growth < 0) growth = 0;
    circle.setGrowth(growth);
  }
}

export function resetDotGrowth(circles: DotGridCircle[]): void {
  for (const circle of circles) {
    circle.setGrowth(0);
  }
}

export function resizeCanvas(canvas: HTMLCanvasElement): CanvasRenderingContext2D | null {
  const context = canvas.getContext("2d");
  if (!context) return null;

  const deviceRatio = Math.min(window.devicePixelRatio || 1, 2);
  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.width = Math.floor(width * deviceRatio);
  canvas.height = Math.floor(height * deviceRatio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  context.setTransform(deviceRatio, 0, 0, deviceRatio, 0, 0);

  return context;
}

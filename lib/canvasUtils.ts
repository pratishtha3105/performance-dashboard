export interface CanvasPoint {
  x: number;
  y: number;
}

/**
 * Scales a data point to canvas coordinates
 */
export function scaleValueToCanvasY(
  value: number,
  minValue: number,
  maxValue: number,
  canvasHeight: number,
  padding: number = 20
): number {
  const range = maxValue - minValue || 1;
  const normalized = (value - minValue) / range;
  return canvasHeight - padding - normalized * (canvasHeight - 2 * padding);
}

/**
 * Scales timestamp to canvas X coordinate
 */
export function scaleTimestampToCanvasX(
  timestamp: number,
  minTimestamp: number,
  maxTimestamp: number,
  canvasWidth: number,
  padding: number = 20
): number {
  const range = maxTimestamp - minTimestamp || 1;
  const normalized = (timestamp - minTimestamp) / range;
  return padding + normalized * (canvasWidth - 2 * padding);
}

/**
 * Clears canvas with white background
 */
export function clearCanvas(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
): void {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * Draws axes on canvas
 */
export function drawAxes(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  minValue: number,
  maxValue: number,
  padding: number = 20
): void {
  ctx.strokeStyle = '#cccccc';
  ctx.fillStyle = '#666666';
  ctx.font = '12px Arial';

  // Y-axis
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, canvas.height - padding);
  ctx.stroke();

  // X-axis
  ctx.beginPath();
  ctx.moveTo(padding, canvas.height - padding);
  ctx.lineTo(canvas.width - padding, canvas.height - padding);
  ctx.stroke();

  // Y-axis labels
  const step = (maxValue - minValue) / 3;
  for (let i = 0; i <= 3; i++) {
    const value = minValue + step * i;
    const y = scaleValueToCanvasY(value, minValue, maxValue, canvas.height, padding);
    ctx.fillText(value.toFixed(0), 5, y + 5);
  }
}

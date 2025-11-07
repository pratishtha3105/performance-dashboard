export class FPSCounter {
  private frameCount: number = 0;
  private lastTime: number = performance.now();
  private fps: number = 60;

  constructor() {
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.fps = 60;
  }

  update(): number {
    this.frameCount++;
    const currentTime = performance.now();
    const elapsed = currentTime - this.lastTime;

    if (elapsed >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / elapsed);
      this.frameCount = 0;
      this.lastTime = currentTime;
    }

    return this.fps;
  }

  getFPS(): number {
    return this.fps;
  }
}

export function getMemoryUsage(): number {
  if (typeof window !== 'undefined' && (performance as any).memory) {
    return (performance as any).memory.usedJSHeapSize / 1048576; // Convert to MB
  }
  return 0;
}

export function measurePerformance<T>(
  fn: () => T,
  label?: string
): { result: T; duration: number } {
  const start = performance.now();
  const result = fn();
  const duration = performance.now() - start;

  if (label) {
    console.log(`${label}: ${duration.toFixed(2)}ms`);
  }

  return { result, duration };
}

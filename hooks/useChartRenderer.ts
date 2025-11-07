'use client';

import { useEffect, useRef, useMemo } from 'react';
import { scaleValueToCanvasY, scaleTimestampToCanvasX, drawAxes, clearCanvas } from '@/lib/canvasUtils';
import type { DataPoint } from '@/lib/types';

interface UseChartRendererOptions {
  data: DataPoint[];
  canvasRef: React.RefObject<HTMLCanvasElement>;
  width?: number;
  height?: number;
  padding?: number;
  color?: string;
  animated?: boolean;
}

/**
 * Hook to handle canvas chart rendering
 */
export function useChartRenderer({
  data,
  canvasRef,
  width = 800,
  height = 400,
  padding = 40,
  color = '#3b82f6',
  animated = true,
}: UseChartRendererOptions) {
  const animationFrameRef = useRef<number | null>(null);

  // Calculate data bounds (memoized)
  const bounds = useMemo(() => {
    if (data.length === 0) {
      return { minValue: 0, maxValue: 100, minTime: 0, maxTime: 1 };
    }

    const values = data.map((d) => d.value);
    const timestamps = data.map((d) => d.timestamp);

    return {
      minValue: Math.min(...values),
      maxValue: Math.max(...values),
      minTime: Math.min(...timestamps),
      maxTime: Math.max(...timestamps),
    };
  }, [data]);

  // Render chart
  const renderChart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    clearCanvas(ctx, canvas);

    // Draw axes
    drawAxes(ctx, canvas, bounds.minValue, bounds.maxValue, padding);

    // Draw line chart
    if (data.length > 0) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();

      data.forEach((point, index) => {
        const x = scaleTimestampToCanvasX(
          point.timestamp,
          bounds.minTime,
          bounds.maxTime,
          canvas.width,
          padding
        );
        const y = scaleValueToCanvasY(
          point.value,
          bounds.minValue,
          bounds.maxValue,
          canvas.height,
          padding
        );

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();
    }
  };

  // Animation loop
  useEffect(() => {
    if (!animated) {
      renderChart();
      return;
    }

    const animate = () => {
      renderChart();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [data, bounds, animated]);

  return { bounds };
}

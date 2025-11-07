'use client';

import { useRef, useEffect, useMemo } from 'react';
import { useData } from '@/components/providers/DataProvider';
import { scaleValueToCanvasY, scaleTimestampToCanvasX, drawAxes, clearCanvas } from '@/lib/canvasUtils';

interface ScatterPlotProps {
  title?: string;
  width?: number;
  height?: number;
  pointRadius?: number;
  color?: string;
}

export default function ScatterPlot({
  title = 'Scatter Plot',
  width = 800,
  height = 400,
  pointRadius = 3,
  color = '#f59e0b',
}: ScatterPlotProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { data } = useData();
  const animationFrameRef = useRef<number | null>(null);

  // Sample data if too many points (for performance)
  const sampledData = useMemo(() => {
    if (data.length <= 1000) return data;

    const step = Math.ceil(data.length / 1000);
    const sampled = [];
    for (let i = 0; i < data.length; i += step) {
      sampled.push(data[i]);
    }
    return sampled;
  }, [data]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || sampledData.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    clearCanvas(ctx, canvas);

    const padding = 40;
    const values = sampledData.map((d) => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const minTime = sampledData[0].timestamp;
    const maxTime = sampledData[sampledData.length - 1].timestamp;

    drawAxes(ctx, canvas, minValue, maxValue, padding);

    // Draw scatter points
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.6;

    sampledData.forEach((point) => {
      const x = scaleTimestampToCanvasX(point.timestamp, minTime, maxTime, canvas.width, padding);
      const y = scaleValueToCanvasY(point.value, minValue, maxValue, canvas.height, padding);

      ctx.beginPath();
      ctx.arc(x, y, pointRadius, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.globalAlpha = 1;
    animationFrameRef.current = requestAnimationFrame(() => {});
  }, [sampledData, pointRadius, color]);

  return (
    <div style={{ marginBottom: '20px' }}>
      <h3>{title}</h3>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          border: '1px solid #ddd',
          borderRadius: '4px',
          backgroundColor: '#fff',
          maxWidth: '100%',
          height: 'auto',
        }}
      />
      <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
        📊 {sampledData.length} points (sampled from {data.length})
      </p>
    </div>
  );
}

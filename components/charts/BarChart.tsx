'use client';

import { useRef, useEffect, useMemo } from 'react';
import { useData } from '@/components/providers/DataProvider';
import { scaleValueToCanvasY, scaleTimestampToCanvasX, drawAxes, clearCanvas } from '@/lib/canvasUtils';
import type { DataPoint } from '@/lib/types';

interface BarChartProps {
  title?: string;
  width?: number;
  height?: number;
  color?: string;
  aggregationPeriod?: number; // milliseconds
}

export default function BarChart({
  title = 'Bar Chart',
  width = 800,
  height = 400,
  color = '#10b981',
  aggregationPeriod = 60000, // Default: 1 minute
}: BarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { data } = useData();
  const animationFrameRef = useRef<number | null>(null);

  // Aggregate data into buckets
  const aggregatedData = useMemo(() => {
    if (data.length === 0) return [];

    const buckets: Map<number, DataPoint[]> = new Map();

    data.forEach((point) => {
      const bucketKey = Math.floor(point.timestamp / aggregationPeriod) * aggregationPeriod;
      if (!buckets.has(bucketKey)) {
        buckets.set(bucketKey, []);
      }
      buckets.get(bucketKey)!.push(point);
    });

    return Array.from(buckets.entries())
      .map(([timestamp, points]) => {
        const values = points.map((p) => p.value);
        const avg = values.reduce((a, b) => a + b, 0) / values.length;
        return { timestamp, value: avg };
      })
      .sort((a, b) => a.timestamp - b.timestamp);
  }, [data, aggregationPeriod]);

  // Render bar chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || aggregatedData.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    clearCanvas(ctx, canvas);

    const padding = 40;
    const values = aggregatedData.map((d) => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const minTime = aggregatedData[0].timestamp;
    const maxTime = aggregatedData[aggregatedData.length - 1].timestamp;

    drawAxes(ctx, canvas, minValue, maxValue, padding);

    // Draw bars
    const barWidth = Math.max(5, (canvas.width - 2 * padding) / aggregatedData.length * 0.8);
    const spacing = (canvas.width - 2 * padding) / aggregatedData.length;

    ctx.fillStyle = color;

    aggregatedData.forEach((point, index) => {
      const x = padding + index * spacing + spacing / 2 - barWidth / 2;
      const y = scaleValueToCanvasY(point.value, minValue, maxValue, canvas.height, padding);
      const barHeight = canvas.height - padding - y;

      ctx.fillRect(x, y, barWidth, barHeight);
      ctx.strokeStyle = '#999';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(x, y, barWidth, barHeight);
    });

    animationFrameRef.current = requestAnimationFrame(() => {});
  }, [aggregatedData, color]);

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
        📊 {aggregatedData.length} bars (aggregated every {(aggregationPeriod / 1000).toFixed(0)}s)
      </p>
    </div>
  );
}

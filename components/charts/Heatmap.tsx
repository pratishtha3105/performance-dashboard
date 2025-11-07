'use client';

import { useRef, useEffect, useMemo } from 'react';
import { useData } from '@/components/providers/DataProvider';
import { clearCanvas } from '@/lib/canvasUtils';

interface HeatmapProps {
  title?: string;
  width?: number;
  height?: number;
  cellSize?: number;
}

export default function Heatmap({
  title = 'Heatmap',
  width = 800,
  height = 400,
  cellSize = 10,
}: HeatmapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { data } = useData();

  // Create heatmap data grid
  const heatmapData = useMemo(() => {
    if (data.length === 0) return { grid: [], minValue: 0, maxValue: 100 };

    // Create grid: rows = value ranges, cols = time buckets
    const numCols = Math.floor(width / cellSize);
    const numRows = Math.floor(height / cellSize);

    const values = data.map((d) => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    const grid: number[][] = Array(numRows)
      .fill(null)
      .map(() => Array(numCols).fill(0));

    // Populate grid
    data.forEach((point, index) => {
      const colIndex = Math.floor((index / data.length) * numCols);
      const normalizedValue = (point.value - minValue) / (maxValue - minValue);
      const rowIndex = Math.floor(normalizedValue * (numRows - 1));

      if (rowIndex >= 0 && rowIndex < numRows && colIndex >= 0 && colIndex < numCols) {
        grid[rowIndex][colIndex]++;
      }
    });

    return { grid, minValue, maxValue };
  }, [data, width, height, cellSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || heatmapData.grid.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    clearCanvas(ctx, canvas);

    const { grid, minValue, maxValue } = heatmapData;
    const maxCount = Math.max(...grid.flat());

    // Draw heatmap
    grid.forEach((row, rowIndex) => {
      row.forEach((count, colIndex) => {
        const normalized = maxCount > 0 ? count / maxCount : 0;
        const hue = (1 - normalized) * 240; // Blue to Red gradient
        const saturation = 100;
        const lightness = 50 - normalized * 30;

        ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        ctx.fillRect(colIndex * cellSize, rowIndex * cellSize, cellSize, cellSize);

        // Optional: border
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(colIndex * cellSize, rowIndex * cellSize, cellSize, cellSize);
      });
    });
  }, [heatmapData, cellSize]);

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
        🔥 Data density visualization (blue = low, red = high)
      </p>
    </div>
  );
}

'use client';

import { useRef, useEffect } from 'react';
import { useChartRenderer } from '@/hooks/useChartRenderer';
import { useData } from '@/components/providers/DataProvider';

interface LineChartProps {
  title?: string;
  width?: number;
  height?: number;
  color?: string;
}

export default function LineChart({ 
  title = 'Line Chart',
  width = 800, 
  height = 400, 
  color = '#3b82f6' 
}: LineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { data } = useData();

  useChartRenderer({
    data,
    canvasRef,
    width,
    height,
    color,
    animated: true,
  });

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
        📊 {data.length} data points
      </p>
    </div>
  );
}

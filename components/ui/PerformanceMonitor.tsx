'use client';

import type { PerformanceMetrics } from '@/lib/types';

interface PerformanceMonitorProps {
  metrics: PerformanceMetrics;
  dataPointCount: number;
  isStreaming: boolean;
}

export default function PerformanceMonitor({
  metrics,
  dataPointCount,
  isStreaming,
}: PerformanceMonitorProps) {
  // Determine FPS color (red < 30, yellow < 50, green >= 50)
  const fpsColor =
    metrics.fps >= 50 ? '#10b981' : metrics.fps >= 30 ? '#f59e0b' : '#ef4444';

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '12px',
        padding: '15px',
        backgroundColor: '#f0f9ff',
        borderRadius: '8px',
        border: '1px solid #bfdbfe',
        marginBottom: '20px',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>FPS</p>
        <p
          style={{
            margin: '0',
            fontSize: '24px',
            fontWeight: 'bold',
            color: fpsColor,
          }}
        >
          {metrics.fps}
        </p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>Memory</p>
        <p style={{ margin: '0', fontSize: '24px', fontWeight: 'bold', color: '#3b82f6' }}>
          {metrics.memoryUsage.toFixed(1)} MB
        </p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>Data Points</p>
        <p style={{ margin: '0', fontSize: '24px', fontWeight: 'bold', color: '#3b82f6' }}>
          {dataPointCount}
        </p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>Status</p>
        <p
          style={{
            margin: '0',
            fontSize: '20px',
            fontWeight: 'bold',
            color: isStreaming ? '#10b981' : '#ef4444',
          }}
        >
          {isStreaming ? '🔴' : '⏹️'}
        </p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>Render Time</p>
        <p style={{ margin: '0', fontSize: '20px', fontWeight: 'bold', color: '#3b82f6' }}>
          {metrics.renderTime.toFixed(1)}ms
        </p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>Process Time</p>
        <p style={{ margin: '0', fontSize: '20px', fontWeight: 'bold', color: '#3b82f6' }}>
          {metrics.dataProcessingTime.toFixed(1)}ms
        </p>
      </div>
    </div>
  );
}

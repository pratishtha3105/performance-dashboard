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
  const fpsColor =
    metrics.fps >= 50 ? '#10b981' : metrics.fps >= 30 ? '#f59e0b' : '#ef4444';

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '1rem',
        padding: '0',
      }}
    >
      {/* FPS Metric */}
      <div className="metric-card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(10, 174, 119, 0.1))', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚡</div>
        <div className="metric-value" style={{ color: fpsColor }}>
          {metrics.fps}
        </div>
        <div className="metric-label">FPS</div>
      </div>

      {/* Memory Metric */}
      <div className="metric-card" style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1))', borderColor: 'rgba(59, 130, 246, 0.2)' }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>💾</div>
        <div className="metric-value">{metrics.memoryUsage.toFixed(1)}</div>
        <div className="metric-label">Memory (MB)</div>
      </div>

      {/* Data Points Metric */}
      <div className="metric-card" style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(126, 34, 206, 0.1))', borderColor: 'rgba(168, 85, 247, 0.2)' }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📊</div>
        <div className="metric-value">{dataPointCount}</div>
        <div className="metric-label">Data Points</div>
      </div>

      {/* Status Metric */}
      <div className="metric-card" style={{ background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.1), rgba(225, 29, 72, 0.1))', borderColor: isStreaming ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)' }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{isStreaming ? '🔴' : '⏹️'}</div>
        <div className="metric-value" style={{ color: isStreaming ? '#10b981' : '#ef4444' }}>
          {isStreaming ? 'LIVE' : 'PAUSED'}
        </div>
        <div className="metric-label">Status</div>
      </div>
    </div>
  );
}

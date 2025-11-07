'use client';

import { useEffect, useState } from 'react';
import { DataProvider, useData } from '@/components/providers/DataProvider';
import { useDataStream } from '@/hooks/useDataStream';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import ScatterPlot from '@/components/charts/ScatterPlot';
import Heatmap from '@/components/charts/Heatmap';
import type { DataPoint, PerformanceMetrics } from '@/lib/types';

function DashboardContent() {
  const { data, isPending } = useData();
  const [streamEnabled, setStreamEnabled] = useState(true);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memoryUsage: 0,
    renderTime: 0,
    dataProcessingTime: 0,
  });

  useDataStream({ enabled: streamEnabled, interval: 100 });
  usePerformanceMonitor({
    enabled: true,
    updateInterval: 1000,
    onMetricsUpdate: setMetrics,
  });

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '10px' }}>📊 Real-Time Data Dashboard</h1>

      {/* Controls */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setStreamEnabled(!streamEnabled)}
          style={{
            padding: '10px 16px',
            backgroundColor: streamEnabled ? '#10b981' : '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          {streamEnabled ? '⏸️ Stop' : '▶️ Start'} Stream
        </button>
      </div>

      {/* Metrics Bar */}
      <div
        style={{
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: '#f0f9ff',
          borderRadius: '8px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '10px',
          border: '1px solid #bfdbfe',
        }}
      >
        <div>
          <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>FPS</p>
          <p style={{ margin: '0', fontSize: '20px', fontWeight: 'bold', color: '#3b82f6' }}>
            {metrics.fps}
          </p>
        </div>
        <div>
          <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>Memory</p>
          <p style={{ margin: '0', fontSize: '20px', fontWeight: 'bold', color: '#3b82f6' }}>
            {metrics.memoryUsage.toFixed(1)} MB
          </p>
        </div>
        <div>
          <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>Data Points</p>
          <p style={{ margin: '0', fontSize: '20px', fontWeight: 'bold', color: '#3b82f6' }}>
            {data.length}
          </p>
        </div>
        <div>
          <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>Status</p>
          <p style={{ margin: '0', fontSize: '20px', fontWeight: 'bold', color: streamEnabled ? '#10b981' : '#ef4444' }}>
            {streamEnabled ? '🔴 Live' : '⏹️ Paused'}
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '20px' }}>
        <LineChart title="📈 Line Chart" width={500} height={300} color="#3b82f6" />
        <BarChart title="📊 Bar Chart" width={500} height={300} color="#10b981" aggregationPeriod={60000} />
        <ScatterPlot title="🔵 Scatter Plot" width={500} height={300} color="#f59e0b" />
        <Heatmap title="🔥 Heatmap" width={500} height={300} cellSize={8} />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [initialData, setInitialData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const response = await fetch('/api/data?count=5000');
        const json = await response.json();
        if (json.success) {
          setInitialData(json.data);
        }
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchInitialData();
  }, []);

  if (loading) {
    return <div style={{ padding: '20px' }}>⏳ Loading initial data...</div>;
  }

  return (
    <DataProvider initialData={initialData}>
      <DashboardContent />
    </DataProvider>
  );
}

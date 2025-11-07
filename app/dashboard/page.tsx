'use client';

import { useEffect, useState } from 'react';
import { DataProvider, useData } from '@/components/providers/DataProvider';
import { useDataStream } from '@/hooks/useDataStream';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import type { DataPoint, PerformanceMetrics } from '@/lib/types';

// Inner component that uses the context
function DashboardContent() {
  const { data, isLoading, isPending } = useData();
  const [streamEnabled, setStreamEnabled] = useState(true);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memoryUsage: 0,
    renderTime: 0,
    dataProcessingTime: 0,
  });

  // Enable data streaming
  useDataStream({ enabled: streamEnabled, interval: 100 });

  // Monitor performance
  usePerformanceMonitor({
    enabled: true,
    updateInterval: 1000,
    onMetricsUpdate: setMetrics,
  });

  return (
    <div style={{ padding: '20px' }}>
      <h1>Real-Time Data Dashboard</h1>

      {/* Controls */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button
          onClick={() => setStreamEnabled(!streamEnabled)}
          style={{
            padding: '8px 16px',
            backgroundColor: streamEnabled ? '#10b981' : '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {streamEnabled ? 'Stop' : 'Start'} Stream
        </button>
      </div>

      {/* Performance Metrics */}
      <div
        style={{
          marginBottom: '20px',
          padding: '10px',
          backgroundColor: '#f3f4f6',
          borderRadius: '4px',
          fontFamily: 'monospace',
        }}
      >
        <p>📊 Performance Metrics:</p>
        <p>FPS: {metrics.fps}</p>
        <p>Memory: {metrics.memoryUsage.toFixed(2)} MB</p>
        <p>Data Points: {data.length}</p>
        <p>Status: {isPending ? '⏳ Updating...' : '✅ Ready'}</p>
      </div>

      {/* Data Display */}
      <div
        style={{
          padding: '10px',
          backgroundColor: '#f9fafb',
          borderRadius: '4px',
          maxHeight: '300px',
          overflowY: 'auto',
        }}
      >
        <h3>Latest Data Points:</h3>
        {data.slice(-5).map((point, idx) => (
          <div key={idx} style={{ fontSize: '12px', marginBottom: '5px' }}>
            <strong>{new Date(point.timestamp).toLocaleTimeString()}</strong> - Value:{' '}
            {point.value.toFixed(2)}, Category: {point.category}
          </div>
        ))}
      </div>
    </div>
  );
}

// Outer component wraps with DataProvider
export default function DashboardPage() {
  const [initialData, setInitialData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data on mount
  useEffect(() => {
    async function fetchInitialData() {
      try {
        const response = await fetch('/api/data?count=1000');
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

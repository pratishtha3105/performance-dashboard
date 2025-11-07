'use client';

import { useEffect, useState } from 'react';
import { DataProvider, useData } from '@/components/providers/DataProvider';
import { useDataStream } from '@/hooks/useDataStream';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import ScatterPlot from '@/components/charts/ScatterPlot';
import Heatmap from '@/components/charts/Heatmap';
import PerformanceMonitor from '@/components/ui/PerformanceMonitor';
import DataTable from '@/components/ui/DataTable';
import type { DataPoint, PerformanceMetrics } from '@/lib/types';

function DashboardContent() {
  const { data } = useData();
  const [streamEnabled, setStreamEnabled] = useState(true);
  const [showTable, setShowTable] = useState(false);
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
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1rem' }}>📊 Real-Time Dashboard</h1>

      {/* Controls */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setStreamEnabled(!streamEnabled)}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: streamEnabled ? '#10b981' : '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
          }}
        >
          {streamEnabled ? '⏸️ Stop' : '▶️ Start'} Stream
        </button>

        <button
          onClick={() => {
            console.log('Show Table button clicked! Current showTable:', showTable);
            setShowTable(!showTable);
          }}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: showTable ? '#3b82f6' : '#9ca3af',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
          }}
        >
          {showTable ? '📊 Hide' : '📋 Show'} Table
        </button>
      </div>

      {/* Performance Metrics */}
      <PerformanceMonitor metrics={metrics} dataPointCount={data.length} isStreaming={streamEnabled} />

      {/* Charts Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem',
      }}>
        <LineChart title="📈 Line Chart" width={400} height={300} color="#3b82f6" />
        <BarChart title="📊 Bar Chart" width={400} height={300} color="#10b981" aggregationPeriod={60000} />
        <ScatterPlot title="🔵 Scatter Plot" width={400} height={300} color="#f59e0b" />
        <Heatmap title="🔥 Heatmap" width={400} height={300} cellSize={8} />
      </div>

      {/* Data Table - CONDITIONAL RENDER */}
      {showTable === true && (
        <div style={{ marginTop: '2rem' }}>
          <DataTable data={data} />
        </div>
      )}
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
    return <div style={{ padding: '2rem' }}>⏳ Loading...</div>;
  }

  return (
    <DataProvider initialData={initialData}>
      <DashboardContent />
    </DataProvider>
  );
}

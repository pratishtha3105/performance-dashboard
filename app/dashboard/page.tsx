'use client';

import { useEffect, useState } from 'react';
import { DataProvider, useData } from '@/components/providers/DataProvider';
import { useDataStream } from '@/hooks/useDataStream';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import ScatterPlot from '@/components/charts/ScatterPlot';
import Heatmap from '@/components/charts/Heatmap';
import FilterPanel from '@/components/controls/FilterPanel';
import TimeRangeSelector from '@/components/controls/TimeRangeSelector';
import DataTable from '@/components/ui/DataTable';
import PerformanceMonitor from '@/components/ui/PerformanceMonitor';
import type { DataPoint, PerformanceMetrics, FilterOptions } from '@/lib/types';

function DashboardContent() {
  const { data, isPending } = useData();
  const [streamEnabled, setStreamEnabled] = useState(true);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memoryUsage: 0,
    renderTime: 0,
    dataProcessingTime: 0,
  });
  const [showTable, setShowTable] = useState(false);

  useDataStream({ enabled: streamEnabled, interval: 100 });
  usePerformanceMonitor({
    enabled: true,
    updateInterval: 1000,
    onMetricsUpdate: setMetrics,
  });

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        📊 Real-Time Data Dashboard
      </h1>

      {/* Stream Control */}
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
            fontWeight: 'bold',
          }}
        >
          {streamEnabled ? '⏸️ Stop' : '▶️ Start'} Stream
        </button>

        <button
          onClick={() => setShowTable(!showTable)}
          style={{
            padding: '10px 16px',
            backgroundColor: showTable ? '#3b82f6' : '#9ca3af',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        >
          {showTable ? '📊 Hide' : '📋 Show'} Data Table
        </button>
      </div>

      {/* Performance Monitor */}
      <PerformanceMonitor metrics={metrics} dataPointCount={data.length} isStreaming={streamEnabled} />

      {/* Controls */}
      <TimeRangeSelector onTimeRangeChange={(start, end) => {}} />
      <FilterPanel onFilterChange={(filters) => {}} dataPointCount={data.length} />

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '20px', marginBottom: '20px' }}>
        <LineChart title="📈 Line Chart" width={450} height={300} color="#3b82f6" />
        <BarChart title="📊 Bar Chart" width={450} height={300} color="#10b981" aggregationPeriod={60000} />
        <ScatterPlot title="🔵 Scatter Plot" width={450} height={300} color="#f59e0b" />
        <Heatmap title="🔥 Heatmap" width={450} height={300} cellSize={8} />
      </div>

      {/* Data Table */}
      {showTable && <DataTable data={data} itemHeight={35} visibleItems={12} />}
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
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>⏳ Loading initial data...</p>
      </div>
    );
  }

  return (
    <DataProvider initialData={initialData}>
      <DashboardContent />
    </DataProvider>
  );
}

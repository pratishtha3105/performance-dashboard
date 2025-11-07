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
    <div style={{ padding: 'clamp(1.5rem, 5vw, 2.5rem)', maxWidth: '1600px', margin: '0 auto' }}>
      {/* Hero Section */}
      <div style={{ marginBottom: '2rem', animation: 'slideInDown 0.6s ease-out' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>📊 Real-Time Data Dashboard</h1>
        <p style={{ color: '#cbd5e1', fontSize: '1rem', margin: 0 }}>
          Monitor 5,000+ data points at 60 FPS with interactive visualizations
        </p>
      </div>

      {/* Controls Section */}
      <div
        style={{
          marginBottom: '2rem',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          animation: 'slideInDown 0.7s ease-out',
        }}
      >
        <button
          onClick={() => setStreamEnabled(!streamEnabled)}
          style={{
            padding: '0.75rem 1.5rem',
            background: streamEnabled
              ? 'linear-gradient(135deg, #10b981, #059669)'
              : 'linear-gradient(135deg, #ef4444, #dc2626)',
            color: '#f0f9ff',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontWeight: 'bold',
            boxShadow: streamEnabled
              ? '0 4px 20px rgba(16, 185, 129, 0.3)'
              : '0 4px 20px rgba(239, 68, 68, 0.3)',
          }}
        >
          {streamEnabled ? '⏸️ Stop' : '▶️ Start'} Stream
        </button>

        <button
          onClick={() => setShowTable(!showTable)}
          style={{
            padding: '0.75rem 1.5rem',
            background: showTable
              ? 'linear-gradient(135deg, #3b82f6, #2563eb)'
              : 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            color: '#f0f9ff',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontWeight: 'bold',
            boxShadow: showTable
              ? '0 4px 20px rgba(59, 130, 246, 0.3)'
              : '0 4px 20px rgba(139, 92, 246, 0.3)',
          }}
        >
          {showTable ? '📊 Hide' : '📋 Show'} Table
        </button>
      </div>

      {/* Performance Metrics */}
      <div style={{ marginBottom: '2rem', animation: 'slideInDown 0.8s ease-out' }}>
        <PerformanceMonitor metrics={metrics} dataPointCount={data.length} isStreaming={streamEnabled} />
      </div>

      {/* Charts Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
          animation: 'fadeIn 1s ease-out',
        }}
      >
        {/* Line Chart Card */}
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(10px)',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            border: '1px solid rgba(71, 85, 105, 0.3)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.borderColor = 'rgba(59, 130, 246, 0.5)';
            el.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.15)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.borderColor = 'rgba(71, 85, 105, 0.3)';
            el.style.boxShadow = 'none';
          }}
        >
          <LineChart title="📈 Line Chart" width={380} height={280} color="#3b82f6" />
        </div>

        {/* Bar Chart Card */}
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(10px)',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            border: '1px solid rgba(71, 85, 105, 0.3)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.borderColor = 'rgba(16, 185, 129, 0.5)';
            el.style.boxShadow = '0 10px 30px rgba(16, 185, 129, 0.15)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.borderColor = 'rgba(71, 85, 105, 0.3)';
            el.style.boxShadow = 'none';
          }}
        >
          <BarChart title="📊 Bar Chart" width={380} height={280} color="#10b981" aggregationPeriod={60000} />
        </div>

        {/* Scatter Plot Card */}
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(10px)',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            border: '1px solid rgba(71, 85, 105, 0.3)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.borderColor = 'rgba(245, 158, 11, 0.5)';
            el.style.boxShadow = '0 10px 30px rgba(245, 158, 11, 0.15)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.borderColor = 'rgba(71, 85, 105, 0.3)';
            el.style.boxShadow = 'none';
          }}
        >
          <ScatterPlot title="🔵 Scatter Plot" width={380} height={280} color="#f59e0b" />
        </div>

        {/* Heatmap Card */}
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(10px)',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            border: '1px solid rgba(71, 85, 105, 0.3)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.borderColor = 'rgba(236, 72, 153, 0.5)';
            el.style.boxShadow = '0 10px 30px rgba(236, 72, 153, 0.15)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.borderColor = 'rgba(71, 85, 105, 0.3)';
            el.style.boxShadow = 'none';
          }}
        >
          <Heatmap title="🔥 Heatmap" width={380} height={280} cellSize={8} />
        </div>
      </div>

      {/* Data Table */}
      {showTable && (
        <div style={{ animation: 'slideInDown 0.5s ease-out' }}>
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
    return (
      <div
        style={{
          padding: '2rem',
          textAlign: 'center',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div>
          <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'slideInDown 0.6s ease-out' }}>⏳</div>
          <p style={{ fontSize: '1.125rem', color: '#cbd5e1', animation: 'slideInDown 0.8s ease-out' }}>
            Loading initial data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <DataProvider initialData={initialData}>
      <DashboardContent />
    </DataProvider>
  );
}

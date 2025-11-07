'use client';

import type { DataPoint } from '@/lib/types';

interface DataTableProps {
  data: DataPoint[];
}

export default function DataTable({ data }: DataTableProps) {
  const displayData = data.slice(-100);

  return (
    <div
      style={{
        padding: '1.5rem',
        background: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(10px)',
        borderRadius: '0.75rem',
        border: '1px solid rgba(71, 85, 105, 0.3)',
        marginTop: '1.5rem',
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#cbd5e1' }}>📋 Latest Data Points</h3>

      {/* Table Header */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr 1fr',
          gap: '15px',
          padding: '10px',
          background: 'rgba(51, 65, 85, 0.5)',
          borderRadius: '0.5rem',
          marginBottom: '10px',
          fontWeight: 'bold',
          fontSize: '12px',
          color: '#cbd5e1',
          border: '1px solid rgba(71, 85, 105, 0.2)',
        }}
      >
        <div>Timestamp</div>
        <div>Value</div>
        <div>Category</div>
      </div>

      {/* Table Rows */}
      <div style={{ maxHeight: '400px', overflowY: 'auto', borderRadius: '0.5rem', border: '1px solid rgba(71, 85, 105, 0.2)' }}>
        {displayData.map((point, index) => (
          <div
            key={index}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr 1fr',
              gap: '15px',
              padding: '10px',
              borderBottom: '1px solid rgba(71, 85, 105, 0.1)',
              fontSize: '12px',
              color: '#cbd5e1',
              backgroundColor: index % 2 === 0 ? 'rgba(15, 23, 42, 0.3)' : 'rgba(30, 41, 59, 0.3)',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.backgroundColor = 'rgba(59, 130, 246, 0.15)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.backgroundColor = index % 2 === 0 ? 'rgba(15, 23, 42, 0.3)' : 'rgba(30, 41, 59, 0.3)';
            }}
          >
            <div style={{ color: '#94a3b8' }}>{new Date(point.timestamp).toLocaleTimeString()}</div>
            <div style={{ fontWeight: 'bold', color: '#60a5fa' }}>{point.value.toFixed(2)}</div>
            <div>
              <span
                style={{
                  display: 'inline-block',
                  padding: '2px 8px',
                  background:
                    point.category === 'A'
                      ? 'rgba(59, 130, 246, 0.2)'
                      : point.category === 'B'
                        ? 'rgba(16, 185, 129, 0.2)'
                        : 'rgba(245, 158, 11, 0.2)',
                  color:
                    point.category === 'A'
                      ? '#60a5fa'
                      : point.category === 'B'
                        ? '#10b981'
                        : '#f59e0b',
                  borderRadius: '0.25rem',
                  fontSize: '11px',
                  fontWeight: '600',
                  border:
                    point.category === 'A'
                      ? '1px solid rgba(59, 130, 246, 0.3)'
                      : point.category === 'B'
                        ? '1px solid rgba(16, 185, 129, 0.3)'
                        : '1px solid rgba(245, 158, 11, 0.3)',
                }}
              >
                {point.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p style={{ fontSize: '12px', color: '#64748b', margin: '10px 0 0 0' }}>
        Showing last {displayData.length} of {data.length} data points
      </p>
    </div>
  );
}

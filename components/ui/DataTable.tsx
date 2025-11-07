'use client';

import type { DataPoint } from '@/lib/types';

interface DataTableProps {
  data: DataPoint[];
}

export default function DataTable({ data }: DataTableProps) {
  // Show only the last 100 rows for performance
  const displayData = data.slice(-100);

  return (
    <div
      style={{
        padding: '15px',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        marginTop: '20px',
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: '10px' }}>📋 Latest Data Points</h3>

      {/* Table Header */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr 1fr',
          gap: '15px',
          padding: '10px',
          backgroundColor: '#e5e7eb',
          borderRadius: '4px',
          marginBottom: '10px',
          fontWeight: 'bold',
          fontSize: '12px',
        }}
      >
        <div>Timestamp</div>
        <div>Value</div>
        <div>Category</div>
      </div>

      {/* Table Rows */}
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {displayData.map((point, index) => (
          <div
            key={index}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr 1fr',
              gap: '15px',
              padding: '10px',
              borderBottom: '1px solid #f3f4f6',
              fontSize: '12px',
              backgroundColor: index % 2 === 0 ? '#fff' : '#f9fafb',
            }}
          >
            <div>{new Date(point.timestamp).toLocaleTimeString()}</div>
            <div style={{ fontWeight: 'bold' }}>{point.value.toFixed(2)}</div>
            <div>
              <span
                style={{
                  display: 'inline-block',
                  padding: '2px 8px',
                  backgroundColor:
                    point.category === 'A' ? '#dbeafe' : point.category === 'B' ? '#dcfce7' : '#fef3c7',
                  borderRadius: '3px',
                  fontSize: '11px',
                }}
              >
                {point.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p style={{ fontSize: '12px', color: '#666', margin: '10px 0 0 0' }}>
        Showing last {displayData.length} of {data.length} data points
      </p>
    </div>
  );
}

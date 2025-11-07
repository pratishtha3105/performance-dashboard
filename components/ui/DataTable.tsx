'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import type { DataPoint } from '@/lib/types';

interface DataTableProps {
  data: DataPoint[];
  itemHeight?: number;
  visibleItems?: number;
}

export default function DataTable({ data, itemHeight = 35, visibleItems = 10 }: DataTableProps) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleItems + 1, data.length);
  const visibleData = data.slice(startIndex, endIndex);
  const offsetY = startIndex * itemHeight;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    setScrollTop(target.scrollTop);
  };

  const totalHeight = data.length * itemHeight;

  return (
    <div
      style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
      }}
    >
      <h3 style={{ marginTop: 0 }}>📋 Data Points (Virtual Scrolling)</h3>

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
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <div>Timestamp</div>
        <div>Value</div>
        <div>Category</div>
      </div>

      {/* Virtual Scrolling Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{
          height: `${visibleItems * itemHeight}px`,
          overflowY: 'auto',
          position: 'relative',
          border: '1px solid #d1d5db',
          borderRadius: '4px',
        }}
      >
        {/* Spacer for items before viewport */}
        <div style={{ height: `${offsetY}px` }} />

        {/* Visible items */}
        {visibleData.map((point, index) => (
          <div
            key={startIndex + index}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr 1fr',
              gap: '15px',
              padding: '10px',
              borderBottom: '1px solid #f3f4f6',
              fontSize: '12px',
              backgroundColor: (startIndex + index) % 2 === 0 ? '#fff' : '#f9fafb',
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

        {/* Spacer for items after viewport */}
        <div style={{ height: `${Math.max(0, totalHeight - offsetY - visibleData.length * itemHeight)}px` }} />
      </div>

      <p style={{ fontSize: '12px', color: '#666', margin: '10px 0 0 0' }}>
        Showing {visibleData.length} of {data.length} items • Scroll to load more
      </p>
    </div>
  );
}

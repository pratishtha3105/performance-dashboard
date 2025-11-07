'use client';

import { useState, useCallback } from 'react';

interface TimeRangeSelectorProps {
  onTimeRangeChange: (startTime: number, endTime: number) => void;
}

export default function TimeRangeSelector({ onTimeRangeChange }: TimeRangeSelectorProps) {
  const [range, setRange] = useState<'1h' | '6h' | '24h' | '7d' | 'all'>('1h');

  const handleRangeChange = useCallback((newRange: typeof range) => {
    setRange(newRange);

    const now = Date.now();
    let startTime = now - 3600000; // Default 1 hour

    switch (newRange) {
      case '1h':
        startTime = now - 3600000;
        break;
      case '6h':
        startTime = now - 6 * 3600000;
        break;
      case '24h':
        startTime = now - 24 * 3600000;
        break;
      case '7d':
        startTime = now - 7 * 24 * 3600000;
        break;
      case 'all':
        startTime = 0;
        break;
    }

    onTimeRangeChange(startTime, now);
  }, [onTimeRangeChange]);

  const buttons = [
    { label: '1h', value: '1h' as const },
    { label: '6h', value: '6h' as const },
    { label: '24h', value: '24h' as const },
    { label: '7d', value: '7d' as const },
    { label: 'All', value: 'all' as const },
  ];

  return (
    <div
      style={{
        padding: '10px',
        backgroundColor: '#f0f9ff',
        borderRadius: '8px',
        marginBottom: '20px',
        border: '1px solid #bfdbfe',
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
      }}
    >
      <label style={{ fontWeight: 'bold', alignSelf: 'center', marginRight: '10px' }}>
        📅 Time Range:
      </label>
      {buttons.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => handleRangeChange(value)}
          style={{
            padding: '6px 12px',
            backgroundColor: range === value ? '#3b82f6' : '#e5e7eb',
            color: range === value ? 'white' : '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: range === value ? 'bold' : 'normal',
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

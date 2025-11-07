'use client';

import { useState, useCallback } from 'react';
import type { FilterOptions } from '@/lib/types';

interface FilterPanelProps {
  onFilterChange: (filters: FilterOptions) => void;
  dataPointCount: number;
}

export default function FilterPanel({ onFilterChange, dataPointCount }: FilterPanelProps) {
  const [categories, setCategories] = useState<string[]>(['A', 'B', 'C']);
  const [valueMin, setValueMin] = useState(50);
  const [valueMax, setValueMax] = useState(150);

  const handleCategoryToggle = useCallback((cat: string) => {
    setCategories((prev) => {
      const newCats = prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat];
      onFilterChange({
        startTime: Date.now() - 3600000, // Last hour
        endTime: Date.now(),
        categories: newCats,
        valueRange: [valueMin, valueMax],
      });
      return newCats;
    });
  }, [valueMin, valueMax, onFilterChange]);

  const handleValueChange = useCallback(
    (newMin: number, newMax: number) => {
      setValueMin(newMin);
      setValueMax(newMax);
      onFilterChange({
        startTime: Date.now() - 3600000,
        endTime: Date.now(),
        categories,
        valueRange: [newMin, newMax],
      });
    },
    [categories, onFilterChange]
  );

  return (
    <div
      style={{
        padding: '15px',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        marginBottom: '20px',
        border: '1px solid #e5e7eb',
      }}
    >
      <h3 style={{ marginTop: 0 }}>🔍 Filter Data</h3>

      {/* Categories */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>
          Categories:
        </label>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {['A', 'B', 'C'].map((cat) => (
            <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <input
                type="checkbox"
                checked={categories.includes(cat)}
                onChange={() => handleCategoryToggle(cat)}
              />
              Category {cat}
            </label>
          ))}
        </div>
      </div>

      {/* Value Range */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>
          Value Range: {valueMin} - {valueMax}
        </label>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="range"
            min="0"
            max="200"
            value={valueMin}
            onChange={(e) => {
              const newMin = parseInt(e.target.value, 10);
              if (newMin < valueMax) {
                handleValueChange(newMin, valueMax);
              }
            }}
            style={{ flex: 1 }}
          />
          <input
            type="range"
            min="0"
            max="200"
            value={valueMax}
            onChange={(e) => {
              const newMax = parseInt(e.target.value, 10);
              if (newMax > valueMin) {
                handleValueChange(valueMin, newMax);
              }
            }}
            style={{ flex: 1 }}
          />
        </div>
      </div>

      {/* Info */}
      <p style={{ fontSize: '12px', color: '#666', margin: '0' }}>
        Displaying {dataPointCount} data points
      </p>
    </div>
  );
}

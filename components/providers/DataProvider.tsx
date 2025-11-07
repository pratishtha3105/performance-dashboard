'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode, useTransition } from 'react';
import type { DataPoint } from '@/lib/types';

interface DataContextType {
  data: DataPoint[];
  setData: (data: DataPoint[]) => void;
  addDataPoint: (point: DataPoint) => void;
  removeOldestDataPoints: (count: number) => void;
  isLoading: boolean;
  isPending: boolean;
  startTransition: React.TransitionStartFunction;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children, initialData = [] }: { children: ReactNode; initialData?: DataPoint[] }) {
  const [data, setData] = useState<DataPoint[]>(initialData);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  // Add a single new data point (maintains array size)
  const addDataPoint = useCallback((point: DataPoint) => {
    startTransition(() => {
      setData((prevData) => {
        // Keep only the last 10,000 points to manage memory
        const maxPoints = 10000;
        const newData = [...prevData, point];
        if (newData.length > maxPoints) {
          return newData.slice(newData.length - maxPoints);
        }
        return newData;
      });
    });
  }, []);

  // Remove oldest data points (for manual cleanup)
  const removeOldestDataPoints = useCallback((count: number) => {
    startTransition(() => {
      setData((prevData) => prevData.slice(count));
    });
  }, []);

  // Batch update data (used for API calls)
  const updateData = useCallback((newData: DataPoint[]) => {
    startTransition(() => {
      setData(newData);
    });
  }, []);

  const value: DataContextType = {
    data,
    setData: updateData,
    addDataPoint,
    removeOldestDataPoints,
    isLoading,
    isPending,
    startTransition,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

// Custom hook to use the data context
export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}

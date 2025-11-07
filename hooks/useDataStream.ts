'use client';

import { useEffect, useRef, useCallback } from 'react';
import { generateNewDataPoint } from '@/lib/dataGenerator';
import { useData } from '@/components/providers/DataProvider';

interface UseDataStreamOptions {
  enabled?: boolean;
  interval?: number; // milliseconds between updates (default: 100ms)
  onError?: (error: Error) => void;
}

/**
 * Hook that simulates real-time data stream
 * Adds a new data point every `interval` milliseconds
 */
export function useDataStream({
  enabled = true,
  interval = 100,
  onError,
}: UseDataStreamOptions = {}) {
  const { data, addDataPoint } = useData();
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const lastDataPointRef = useRef<ReturnType<typeof generateNewDataPoint> | null>(null);

  // Initialize with first data point
  useEffect(() => {
    if (data.length > 0 && !lastDataPointRef.current) {
      lastDataPointRef.current = data[data.length - 1];
    }
  }, [data]);

  // Start/stop data stream
  useEffect(() => {
    if (!enabled) {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
      return;
    }

    intervalIdRef.current = setInterval(() => {
      try {
        const lastPoint = lastDataPointRef.current || data[data.length - 1];
        if (lastPoint) {
          const newPoint = generateNewDataPoint(lastPoint);
          lastDataPointRef.current = newPoint;
          addDataPoint(newPoint);
        }
      } catch (error) {
        if (onError && error instanceof Error) {
          onError(error);
        }
        console.error('Error generating new data point:', error);
      }
    }, interval);

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [enabled, interval, addDataPoint, data]);

  return {
    isStreaming: enabled,
  };
}

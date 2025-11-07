'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { FPSCounter, getMemoryUsage } from '@/lib/performanceUtils';
import type { PerformanceMetrics } from '@/lib/types';

interface UsePerformanceMonitorOptions {
  enabled?: boolean;
  updateInterval?: number;
  onMetricsUpdate?: (metrics: PerformanceMetrics) => void;
}

export function usePerformanceMonitor({
  enabled = true,
  updateInterval = 1000,
  onMetricsUpdate,
}: UsePerformanceMonitorOptions = {}) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memoryUsage: 0,
    renderTime: 0,
    dataProcessingTime: 0,
  });

  const fpsCounterRef = useRef<FPSCounter | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const updateIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize FPS counter
  useEffect(() => {
    if (!fpsCounterRef.current) {
      try {
        fpsCounterRef.current = new FPSCounter();
      } catch (error) {
        console.error('Failed to create FPSCounter:', error);
      }
    }
  }, []);

  // Update frame count
  const updateFrame = useCallback(() => {
    if (fpsCounterRef.current && enabled) {
      fpsCounterRef.current.update();
      animationFrameRef.current = requestAnimationFrame(updateFrame);
    }
  }, [enabled]);

  // Setup animation loop and metrics update
  useEffect(() => {
    if (!enabled) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
      }
      return;
    }

    // Start frame counting
    if (fpsCounterRef.current) {
      animationFrameRef.current = requestAnimationFrame(updateFrame);
    }

    // Update metrics display every second
    updateIntervalRef.current = setInterval(() => {
      if (fpsCounterRef.current) {
        const newMetrics: PerformanceMetrics = {
          fps: fpsCounterRef.current.getFPS(),
          memoryUsage: getMemoryUsage(),
          renderTime: 0,
          dataProcessingTime: 0,
        };

        setMetrics(newMetrics);
        onMetricsUpdate?.(newMetrics);
      }
    }, updateInterval);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
      }
    };
  }, [enabled, updateInterval, updateFrame, onMetricsUpdate]);

  return metrics;
}

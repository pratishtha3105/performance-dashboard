'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { FPSCounter, getMemoryUsage } from '@/lib/performanceUtils';
import type { PerformanceMetrics } from '@/lib/types';

interface UsePerformanceMonitorOptions {
  enabled?: boolean;
  updateInterval?: number; // milliseconds (default: 1000ms)
  onMetricsUpdate?: (metrics: PerformanceMetrics) => void;
}

/**
 * Hook to monitor FPS, memory usage, and render performance
 */
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

  const fpsCounterRef = useRef(new FPSCounter());
  const animationFrameRef = useRef<number | null>(null);
  const updateIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastRenderTimeRef = useRef(performance.now());

  // Update FPS on every frame
  const updateFrame = useCallback(() => {
    const now = performance.now();
    const fps = fpsCounterRef.current.update();
    const renderTime = now - lastRenderTimeRef.current;
    lastRenderTimeRef.current = now;

    if (enabled) {
      animationFrameRef.current = requestAnimationFrame(updateFrame);
    }
  }, [enabled]);

  // Update metrics display periodically
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

    // Start FPS counting
    animationFrameRef.current = requestAnimationFrame(updateFrame);

    // Update metrics display
    updateIntervalRef.current = setInterval(() => {
      const newMetrics: PerformanceMetrics = {
        fps: fpsCounterRef.current.getFPS(),
        memoryUsage: getMemoryUsage(),
        renderTime: 0, // Could be tracked more precisely
        dataProcessingTime: 0, // Could be tracked more precisely
      };

      setMetrics(newMetrics);
      onMetricsUpdate?.(newMetrics);
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

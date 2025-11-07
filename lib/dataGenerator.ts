import type { DataPoint, AggregatedData } from './types';

export function generateInitialDataset(count: number = 10000): DataPoint[] {
  const now = Date.now();
  const dataPoints: DataPoint[] = [];

  for (let i = 0; i < count; i++) {
    const timestamp = now - (count - i) * 100;
    const sineValue = Math.sin(i / 100) * 30;
    const noiseValue = (Math.random() - 0.5) * 20;
    const trendValue = (i / count) * 50;
    const value = 100 + sineValue + noiseValue + trendValue;

    dataPoints.push({
      timestamp,
      value: Math.max(0, value),
      category: ['A', 'B', 'C'][i % 3],
      metadata: { source: 'sensor', region: ['North', 'South', 'East', 'West'][i % 4] },
    });
  }

  return dataPoints;
}

export function generateNewDataPoint(lastDataPoint: DataPoint): DataPoint {
  const timestamp = Date.now();
  const sineComponent = Math.sin(timestamp / 10000) * 10;
  const randomWalk = (Math.random() - 0.5) * 5;
  const value = Math.max(50, lastDataPoint.value + randomWalk + sineComponent);

  return {
    timestamp,
    value,
    category: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
    metadata: { source: 'sensor', region: ['North', 'South', 'East', 'West'][Math.floor(Math.random() * 4)] },
  };
}

export function aggregateDataByPeriod(dataPoints: DataPoint[], periodMs: number): AggregatedData[] {
  if (dataPoints.length === 0) return [];

  const aggregated: Map<number, DataPoint[]> = new Map();
  dataPoints.forEach((point) => {
    const periodKey = Math.floor(point.timestamp / periodMs) * periodMs;
    if (!aggregated.has(periodKey)) aggregated.set(periodKey, []);
    aggregated.get(periodKey)!.push(point);
  });

  return Array.from(aggregated.entries())
    .map(([timestamp, points]) => {
      const values = points.map((p) => p.value);
      return {
        timestamp,
        min: Math.min(...values),
        max: Math.max(...values),
        avg: values.reduce((a, b) => a + b, 0) / values.length,
        count: points.length,
      };
    })
    .sort((a, b) => a.timestamp - b.timestamp);
}

export function filterDataPoints(dataPoints: DataPoint[], startTime: number, endTime: number, categories?: string[]): DataPoint[] {
  return dataPoints.filter((point) => {
    const inTimeRange = point.timestamp >= startTime && point.timestamp <= endTime;
    const inCategory = !categories || categories.includes(point.category || '');
    return inTimeRange && inCategory;
  });
}

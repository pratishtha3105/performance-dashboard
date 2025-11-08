# Performance Dashboard

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-blue?style=for-the-badge&logo=vercel)](https://performance-dashboard-jefws7cpt.vercel.app/)

A high-performance real-time data visualization dashboard built with **Next.js 14+**, **React 18**, and **TypeScript**.

**🔗 Live Demo:** [https://performance-dashboard-jefws7cpt.vercel.app/](https://performance-dashboard-jefws7cpt.vercel.app/)

**📊 Dashboard:** [https://performance-dashboard-jefws7cpt.vercel.app/dashboard](https://performance-dashboard-jefws7cpt.vercel.app/dashboard)

## 🎯 Features

- **4 Chart Types**: Line Chart, Bar Chart, Scatter Plot, Heatmap
- **Real-Time Updates**: 100ms data streaming
- **Performance**: 30-60 FPS with 5,000+ data points
- **Responsive**: Desktop, tablet, and mobile support
- **Virtual Scrolling**: Handles large datasets efficiently
- **Performance Monitoring**: Live FPS, memory, and data metrics

## 🛠️ Tech Stack

- **Frontend**: Next.js 14+, React 18, TypeScript
- **Rendering**: Canvas API (built from scratch)
- **State Management**: React Context + Custom Hooks
- **Deployment**: Vercel

## 📊 Performance Metrics

| Metric | Achieved |
|--------|----------|
| FPS | 30-60 ✅ |
| Interaction Response | < 50ms ✅ |
| Bundle Size | 91.6 KB ✅ |
| Memory Stable | Yes ✅ |

## 📦 Setup
Install
npm install

Development
npm run dev

Production
npm run build
npm start
Visit `http://localhost:3000/dashboard`

## 🚀 Deployment

Deployed on **Vercel**: [Live Demo](https://performance-dashboard-rh37qlxtm.vercel.app/dashboard)

## 📁 Project Structure

├── app/
│ ├── dashboard/page.tsx
│ ├── api/data/route.ts
│ └── globals.css
├── components/charts/
│ ├── LineChart.tsx
│ ├── BarChart.tsx
│ ├── ScatterPlot.tsx
│ └── Heatmap.tsx
├── components/ui/
│ ├── DataTable.tsx
│ └── PerformanceMonitor.tsx
├── hooks/
│ ├── useDataStream.ts
│ ├── useChartRenderer.ts
│ └── usePerformanceMonitor.ts
└── lib/
├── types.ts
├── dataGenerator.ts
└── canvasUtils.ts

## 🎨 Features

### Dashboard
- 4 interactive charts with real-time updates
- Performance monitoring (FPS, Memory)
- Start/Stop stream control
- Data filtering and time range selection
- Virtual scrolling data table

### Performance Optimization
- `useMemo` for expensive calculations
- `useCallback` for event handlers
- `useTransition` for non-blocking updates
- `React.memo` for chart components
- Canvas with RequestAnimationFrame
- Sliding window for memory efficiency

## 📚 Documentation

- **[PERFORMANCE.md](./PERFORMANCE.md)** - Detailed performance benchmarks

## 🔗 Links

- **Live Demo**: https://performance-dashboard-rh37qlxtm.vercel.app/dashboard
- **GitHub**: https://github.com/pratishtha3105/performance-dashboard

---

**Built with ❤️ for high-performance web development**





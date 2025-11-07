import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Performance Dashboard - Real-Time Data Visualization',
  description: 'High-performance real-time dashboard with 10k+ data points at 60fps',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3b82f6',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>
        <header
          style={{
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.8))',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
            padding: 'clamp(1rem, 3vw, 1.5rem)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div
            style={{
              maxWidth: '1600px',
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  fontSize: '1.5rem',
                  background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                📊
              </div>
              <h1 style={{ margin: 0, fontSize: 'clamp(1.25rem, 4vw, 1.875rem)' }}>
                Performance Dashboard
              </h1>
            </div>
            <nav style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)', display: 'flex', gap: '2rem' }}>
              <a href="/" style={{ color: '#a5b4fc', textDecoration: 'none', transition: 'color 0.3s' }}>
                Home
              </a>
              <a href="/dashboard" style={{ color: '#a5b4fc', textDecoration: 'none', transition: 'color 0.3s' }}>
                Dashboard
              </a>
            </nav>
          </div>
        </header>

        <main style={{ minHeight: '100vh' }}>{children}</main>

        <footer
          style={{
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9))',
            borderTop: '1px solid rgba(148, 163, 184, 0.1)',
            color: '#94a3b8',
            padding: 'clamp(1.5rem, 3vw, 2rem)',
            textAlign: 'center',
            marginTop: '3rem',
            fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
          }}
        >
          <p>© 2025 Performance Dashboard. Built with Next.js 14+ and React 18.</p>
        </footer>
      </body>
    </html>
  );
}

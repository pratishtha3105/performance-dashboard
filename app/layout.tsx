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
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      </head>
      <body>
        <header
          style={{
            backgroundColor: '#1f2937',
            color: 'white',
            padding: 'clamp(1rem, 3vw, 1.5rem)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
          }}
        >
          <div
            style={{
              maxWidth: '1400px',
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h1 style={{ margin: 0, fontSize: 'clamp(1.25rem, 4vw, 1.875rem)' }}>
              📊 Performance Dashboard
            </h1>
            <nav style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
              <a href="/" style={{ color: '#93c5fd', textDecoration: 'none', marginLeft: '1rem' }}>
                Home
              </a>
              <a href="/dashboard" style={{ color: '#93c5fd', textDecoration: 'none', marginLeft: '1rem' }}>
                Dashboard
              </a>
            </nav>
          </div>
        </header>

        <main style={{ minHeight: '100vh' }}>{children}</main>

        <footer
          style={{
            backgroundColor: '#1f2937',
            color: '#d1d5db',
            padding: 'clamp(1rem, 3vw, 2rem)',
            textAlign: 'center',
            marginTop: '3rem',
            fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
          }}
        >
          <p>© 2025 Performance Dashboard. Built with Next.js 14+ and React.</p>
        </footer>
      </body>
    </html>
  );
}

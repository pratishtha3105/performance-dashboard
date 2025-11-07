import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Performance Dashboard',
  description: 'Real-time data visualization with 10k+ points at 60fps',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>Performance Dashboard</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}

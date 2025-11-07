import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🚀 Performance Dashboard</h1>
      <p>Welcome! Click below to see the real-time charts.</p>
      <Link href="/dashboard">
        <button
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Go to Dashboard →
        </button>
      </Link>
    </div>
  );
}

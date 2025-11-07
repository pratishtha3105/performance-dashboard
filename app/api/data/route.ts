import { NextRequest, NextResponse } from 'next/server';

/**
 * Simple test data generator
 */
function generateTestData(count: number = 100) {
  const now = Date.now();
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      timestamp: now - (count - i) * 100,
      value: 100 + Math.sin(i / 100) * 30 + Math.random() * 20,
      category: ['A', 'B', 'C'][i % 3],
    });
  }
  return data;
}

/**
 * GET /api/data
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const count = parseInt(searchParams.get('count') ?? '100', 10);

    const data = generateTestData(count);

    return NextResponse.json(
      {
        success: true,
        count: data.length,
        data,
        timestamp: Date.now(),
      },
      {
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/data
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { count = 100 } = body;

    const data = generateTestData(count);

    return NextResponse.json({
      success: true,
      count: data.length,
      data,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

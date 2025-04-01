import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Instead of dynamically generating a component, just use our example
    return NextResponse.json({
      success: true,
      previewUrl: '/landing-page-example'
    })
  } catch (error) {
    console.error('Error processing preview request:', error)
    return NextResponse.json(
      { error: 'Failed to create component preview' },
      { status: 500 }
    )
  }
} 
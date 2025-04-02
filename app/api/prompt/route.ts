import { NextResponse } from "next/server"
import { cookies } from "next/headers"

const SESSION_COOKIE_NAME = "va_prompt_session"
const MAX_AGE = 300 // 5 minutes in seconds

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt text is required" }, { status: 400 })
    }

    // Generate a unique ID for the prompt session
    const sessionId = Date.now().toString(36) + Math.random().toString(36).substring(2)
    
    // Set a session cookie with the prompt and ID
    cookies().set({
      name: SESSION_COOKIE_NAME,
      value: JSON.stringify({
        id: sessionId,
        prompt,
        timestamp: Date.now()
      }),
      maxAge: MAX_AGE,
      path: "/",
      httpOnly: true,
      sameSite: "strict"
    })
    
    return NextResponse.json({ 
      success: true, 
      sessionId,
      expiresIn: MAX_AGE
    })
  } catch (error) {
    console.error("Error storing prompt:", error)
    return NextResponse.json({ error: "Failed to store prompt" }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Get the session cookie
    const sessionCookie = cookies().get(SESSION_COOKIE_NAME)
    
    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json({ prompt: null })
    }
    
    // Parse the session data
    const session = JSON.parse(sessionCookie.value)
    
    // Check if the session has expired (should not happen due to cookie maxAge, but just in case)
    const now = Date.now()
    if (now - session.timestamp > MAX_AGE * 1000) {
      cookies().delete(SESSION_COOKIE_NAME)
      return NextResponse.json({ prompt: null })
    }
    
    // Clear the cookie after use
    cookies().delete(SESSION_COOKIE_NAME)
    
    return NextResponse.json({ 
      prompt: session.prompt,
      sessionId: session.id
    })
  } catch (error) {
    console.error("Error retrieving prompt:", error)
    return NextResponse.json({ prompt: null })
  }
} 
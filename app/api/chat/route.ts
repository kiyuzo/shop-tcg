import { NextRequest, NextResponse } from 'next/server'

// Test endpoint
export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    hasApiKey: !!process.env.GROQ_API_KEY,
    apiKeyLength: process.env.GROQ_API_KEY?.length || 0
  })
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    const apiKey = process.env.GROQ_API_KEY
    
    console.log('=== CHAT API DEBUG ===')
    console.log('Groq API Key present:', !!apiKey)
    console.log('API Key length:', apiKey?.length || 0)
    console.log('Received messages:', messages?.length)
    console.log('First message:', messages?.[0])

    if (!apiKey) {
      console.error('GROQ_API_KEY is not configured')
      return NextResponse.json(
        { message: 'AI chatbot is currently unavailable. Please check back later.' },
        { status: 200 }
      )
    }

    const systemPrompt = `You are a helpful assistant for a Trading Card Game (TCG) e-commerce store called "KON". 
You specialize in helping customers with:
- Finding specific trading cards (Pokemon, Yu-Gi-Oh!, Magic: The Gathering, One Piece)
- Explaining card conditions (Mint, Near Mint, Lightly Played, etc.)
- Answering questions about card rarity and value
- Helping with orders and shipping
- Providing general TCG knowledge

Be friendly, concise, and helpful. If asked about specific products, mention that users can browse the products page.
Keep responses under 150 words unless more detail is specifically requested.`

    console.log('Calling Groq API...')
    
    // Use fetch instead of SDK to avoid import issues
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 500,
      })
    })

    console.log('Groq response status:', groqResponse.status)

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text()
      console.error('Groq API error response:', errorText)
      return NextResponse.json(
        { message: 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment.' },
        { status: 200 }
      )
    }

    const data = await groqResponse.json()
    const assistantMessage = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.'
    
    console.log('Groq response received successfully')
    console.log('=== END DEBUG ===')

    return NextResponse.json({ message: assistantMessage })
  } catch (error: any) {
    console.error('=== CHAT API ERROR ===')
    console.error('Error name:', error.name)
    console.error('Error message:', error.message)
    console.error('Error stack:', error.stack)
    console.error('=== END ERROR ===')
    
    return NextResponse.json(
      { message: 'I\'m currently experiencing technical difficulties. Please try again later.' },
      { status: 200 }
    )
  }
}

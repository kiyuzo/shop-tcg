import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || ''
})

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'Groq API key not configured' },
        { status: 500 }
      )
    }

    const systemPrompt = `You are a helpful assistant for a Trading Card Game (TCG) e-commerce store called "Wabi Market". 
You specialize in helping customers with:
- Finding specific trading cards (Pokemon, Yu-Gi-Oh!, Magic: The Gathering, One Piece)
- Explaining card conditions (Mint, Near Mint, Lightly Played, etc.)
- Answering questions about card rarity and value
- Helping with orders and shipping
- Providing general TCG knowledge

Be friendly, concise, and helpful. If asked about specific products, mention that users can browse the products page.
Keep responses under 150 words unless more detail is specifically requested.`

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      model: 'llama-3.1-70b-versatile',
      temperature: 0.7,
      max_tokens: 500,
    })

    const assistantMessage = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.'

    return NextResponse.json({ message: assistantMessage })
  } catch (error: any) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to process chat request' },
      { status: 500 }
    )
  }
}

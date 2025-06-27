import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
import { PrismaClient } from "@/lib/generated/prisma"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "sk-dummy-key-for-build",
})

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { message, conversationId, organizationId } = await request.json()

    if (!message || !organizationId) {
      return NextResponse.json(
        { error: "Message and organizationId are required" },
        { status: 400 }
      )
    }

    // Get or create conversation
    let conversation
    if (conversationId) {
      conversation = await prisma.conversation.findUnique({
        where: { id: conversationId },
        include: { messages: { orderBy: { createdAt: "asc" } } },
      })
    } else {
      conversation = await prisma.conversation.create({
        data: {
          organizationId,
          status: "active",
        },
        include: { messages: true },
      })
    }

    if (!conversation) {
      return NextResponse.json(
        { error: "Conversation not found" },
        { status: 404 }
      )
    }

    // Save user message
    await prisma.message.create({
      data: {
        conversationId: conversation.id,
        content: message,
        role: "user",
        isFromAI: false,
      },
    })

    // Get AI agent for organization
    const aiAgent = await prisma.aIAgent.findFirst({
      where: {
        organizationId,
        isActive: true,
      },
    })

    // Prepare conversation history for OpenAI
    const messages = [
      {
        role: "system" as const,
        content:
          aiAgent?.systemPrompt ||
          "You are a helpful customer support agent. Be concise and helpful.",
      },
      ...conversation.messages.map((msg) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
      {
        role: "user" as const,
        content: message,
      },
    ]

    // Get AI response
    const completion = await openai.chat.completions.create({
      model: aiAgent?.model || "gpt-4o-mini",
      messages,
      temperature: aiAgent?.temperature || 0.7,
      max_tokens: aiAgent?.maxTokens || 1000,
    })

    const aiResponse =
      completion.choices[0]?.message?.content ||
      "I apologize, but I could not process your request."

    // Save AI response
    const aiMessage = await prisma.message.create({
      data: {
        conversationId: conversation.id,
        content: aiResponse,
        role: "assistant",
        isFromAI: true,
        confidence: completion.choices[0]?.finish_reason === "stop" ? 0.9 : 0.7,
      },
    })

    return NextResponse.json({
      response: aiResponse,
      conversationId: conversation.id,
      messageId: aiMessage.id,
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

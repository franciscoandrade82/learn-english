import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Simple in-memory rate limiter: max 10 requests per IP per hour
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS = 10;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_REQUESTS) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Try again later!" },
      { status: 429 },
    );
  }
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 },
    );
  }

  const { text, prompt } = await req.json();

  if (!text || text.trim().length < 5) {
    return NextResponse.json(
      { error: "Please write a bit more!" },
      { status: 400 },
    );
  }

  const openai = new OpenAI({ apiKey });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a friendly English teacher for an 8-year-old Portuguese student learning English.

Review their text. Be SHORT and encouraging. The student won't read long paragraphs.

Format (use markdown bold for headers, keep each section to 1-2 short lines max):

**Good! 🌟**
1-2 bullet points of what they did right (short!)

**Fix 🔧**
1-2 bullet points with corrections (show wrong → right)

**Corrected text ✨**
The corrected version of their text

**Em português 🇵🇹**
Same feedback in European Portuguese (PT-PT, NOT Brazilian Portuguese). Very brief, 2-3 lines total.

Rules:
- Maximum 100 words total (excluding the corrected text and Portuguese section)
- Use bullet points, not paragraphs
- Be encouraging but brief
- If perfect, just celebrate and skip the Fix section
- The Portuguese section MUST use European Portuguese (Portugal), not Brazilian Portuguese. Use "tu" not "você", and Portuguese vocabulary/expressions.`,
        },
        {
          role: "user",
          content: `The writing prompt was: "${prompt}"\n\nThe student wrote:\n"${text}"`,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const feedback = response.choices[0]?.message?.content;
    return NextResponse.json({ feedback });
  } catch (error) {
    console.error("OpenAI error:", error);
    return NextResponse.json(
      { error: "Could not review your text. Please try again." },
      { status: 500 },
    );
  }
}

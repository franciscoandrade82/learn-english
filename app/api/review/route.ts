import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
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
          content: `You are a friendly, encouraging English teacher for a 3rd-grade student (8 years old) in Portugal who is learning English. The student's native language is Portuguese.

Your job is to review their short English composition and give feedback. Be VERY encouraging and positive — celebrate what they got right before mentioning mistakes.

Rules:
- Use simple language the student can understand
- Use emoji to make it fun
- First, say what they did well (at least 2 things)
- Then gently point out 1-3 mistakes with the correction
- Show the corrected version of their text at the end
- Keep your response short (under 200 words)
- If the text is mostly correct, celebrate it!
- Never be harsh or discouraging
- Format your response in sections: "Great job! 🌟", "Let's fix a few things 🔧", "Your corrected text ✨"`,
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

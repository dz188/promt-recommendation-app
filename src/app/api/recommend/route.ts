import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { domain, userPrompts } = await req.json();

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    temperature: 0.8,
    messages: [
      {
        role: "system",
        content: `You are a prompt strategist helping creators discover high-value prompts based on their product domain.

Generate 5 NEW and UNIQUE prompts NOT overlapping with the user's past prompts.

For each prompt, provide these fields:
- prompt: The prompt text.
- reason: A short explanation why it is useful.
- searchVolume: Estimated monthly search volume (integer).
- relevanceScore: Relevance to domain, from 0 to 1 (float).
- buyerIntentScore: Buyer intent from 0 to 1 (float).

ONLY output a JSON array in EXACTLY this format:

[
  {
    "prompt": "...",
    "reason": "...",
    "searchVolume": 1234,
    "relevanceScore": 0.9,
    "buyerIntentScore": 0.8
  },
  ...
]`
      },
      {
        role: "user",
        content: `
Product domain: "${domain}"

User's past prompts:
${userPrompts.map((p: string, i: number) => `${i + 1}. ${p}`).join("\n")}
        `,
      },
    ],
  });

  const raw = completion.choices[0].message.content;

  try {
    const parsed = JSON.parse(raw || "[]");
    return NextResponse.json(parsed.slice(0, 5));
  } catch (err) {
    console.error("JSON parse error:", err);
    return NextResponse.json([]);
  }
}

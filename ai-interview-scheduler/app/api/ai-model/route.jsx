import { QUESTIONS_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  try {
    const { jobPosition, jobDescription, duration, type } = await req.json();

    const FINAL_PROMPT = QUESTIONS_PROMPT
      .replace("{{jobTitle}}", jobPosition || "")
      .replace("{{jobDescription}}", jobDescription || "")
      .replace("{{duration}}", duration || "")
      .replace("{{type}}", type || "");

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini", 
      messages: [
        {
          role: "system",
          content: "You are an AI that generates interview questions in JSON format.",
        },
        {
          role: "user",
          content: FINAL_PROMPT,
        },
      ],
    });

    const aiResponse = completion.choices[0].message?.content || "";

    return NextResponse.json({ content: aiResponse });
  } 

  catch (error) {
    console.error("AI ERROR:", error);

    if (error.status === 429) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "AI generation failed" },
      { status: 500 }
    );
  }
  
}

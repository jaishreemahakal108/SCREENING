// import { FEEDBACK_PROMPT } from "@/services/Constants";
// import { OpenAI } from "openai/client.js";

// export async function POST(req) {
//     const {conversation}=await req.json();
//     const FINAL_PROMPT=FEEDBACK_PROMPT.replace('{{conversation}}',JSON.stringify(conversation));

//     try {
//         const openai = new OpenAI({
//           baseURL: "https://openrouter.ai/api/v1",
//           apiKey: process.env.OPENROUTER_API_KEY,
//         });
    
//         const completion = await openai.chat.completions.create({
//           model: "openai/gpt-4o-mini", 
//           messages: [
//             {
//               role: "user",
//               content: FINAL_PROMPT,
//             },
//           ],
//         });
//         return NextResponse.json({ content: aiResponse });
//     } 
//     catch (error) {
//         console.error("AI ERROR:", error);
    
//         if (error.status === 429) {
//           return NextResponse.json(
//             { error: "Rate limit exceeded. Please try again later." },
//             { status: 429 }
//           );
//         }
    
//         return NextResponse.json(
//           { error: "AI generation failed" },
//           { status: 500 }
//         );
//     }
// }

import { FEEDBACK_PROMPT } from "@/services/Constants";
import { OpenAI } from "openai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { conversation } = await req.json();
    if (!conversation) return NextResponse.json({ error: "No conversation provided" }, { status: 400 });

    const FINAL_PROMPT = FEEDBACK_PROMPT.replace('{{conversation}}', JSON.stringify(conversation));

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [{ role: "user", content: FINAL_PROMPT }],
    });

    if (!completion?.choices?.[0]?.message?.content) {
      console.error("OpenAI response invalid:", completion);
      return NextResponse.json({ error: "Invalid AI response" }, { status: 500 });
    }

    const aiResponse = completion.choices[0].message.content;
    return NextResponse.json({ content: aiResponse });

  } catch (error) {
    console.error("AI ERROR:", error);
    return NextResponse.json({ error: error.message || "AI generation failed" }, { status: 500 });
  }
}
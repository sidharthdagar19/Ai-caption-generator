import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId } = await auth();
    const { data: knowledgeData } = await supabase
      .from("knowledge")
     .select("content")
    .eq("user_id", userId);

    const topic = body.topic;
    const { data: profile } = await supabase
  .from("profiles")
  .select("*")
  .eq("user_id", userId)
  .single();
    const knowledgeText =
     knowledgeData
       ?.map((item: any) => item.content)
      .join("\n\n") || "";
      const profileText = `
        Practice Name: ${profile?.practice_name ?? ""}
        Location: ${profile?.location ?? ""}  
        Brand Voice: ${profile?.brand_voice ?? ""}
        Target Audience: ${profile?.target_audience ?? ""}
        Services: ${profile?.services ?? ""}
        Call To Action: ${profile?.call_to_action ?? ""}
`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },

        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",

          messages: [
            {
              role: "system",
              content:
                "You are an expert medical social media caption writer.",
            },

            {
  role: "user",
content: `
PRACTICE PROFILE

${profileText}

CURRENT KNOWLEDGE

${knowledgeText}

TOPIC

${topic}

Instructions:

- Write 3 Instagram captions
- Follow the clinic's brand voice
- Target the clinic's audience
- Mention services when relevant
- Use current promotions if relevant
- Include the preferred call-to-action
- Keep captions engaging and professional
- Separate each caption using ---
`
}
              
 
          ],

          temperature: 0.8,
        }),
      }
    );

    const data = await response.json();

    const text =
      data.choices?.[0]?.message?.content || "";

    const captions = text
      .split("---")
      .map((caption: string) => caption.trim())
      .filter(Boolean);

      for (const caption of captions) {
  await supabase.from("captions").insert({
    topic,
    content: caption,
    user_id: userId,
  });
}

    return NextResponse.json({
      captions,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Failed to generate captions",
      },
      {
        status: 500,
      }
    );
  }
}

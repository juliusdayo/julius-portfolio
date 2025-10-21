import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(request: NextRequest) {
  try {
    // Check if API key is available
    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      console.error("GOOGLE_GEMINI_API_KEY is not set");
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    const { genres } = await request.json();

    if (!genres || !Array.isArray(genres) || genres.length === 0) {
      return NextResponse.json(
        { error: "Genres array is required" },
        { status: 400 }
      );
    }

    // Take top 3 genres
    const topGenres = genres.slice(0, 3);

    // Create the prompt for Gemini
    const prompt = `Make a witty Tagalog roast or teasing comment based on the music genres: ${topGenres.join(
      ", "
    )}. 

Use various Filipino expressions and starting words, not just "Uy". Examples:
- "Ano ba yan, puro mainstream"
- "Grabe naman, hopeless romantic"
- "Ay sus, emo kid pa rin"
- "Hala siya, feeling badass"
- "Naks naman, cultured"
- "Jusko, loud siguro sa bahay"
- "Sige na, ikaw na maarte"
- "Ay wow, deep thinker"

Keep it short (max 5 words), playful, and purely in Tagalog/Taglish. Sound like a Filipino friend playfully roasting someone's music taste. Return ONLY the roast comment, nothing else.`;

    // Initialize the Google GenAI client
    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_GEMINI_API_KEY!,
    });

    // Generate content
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 50,
        thinkingConfig: {
          thinkingBudget: 0, // Disables thinking for faster responses
        },
      },
    });

    const generatedText = response.text;

    if (!generatedText) {
      console.error("No text generated from Gemini");
      return NextResponse.json(
        { error: "No response generated" },
        { status: 500 }
      );
    }

    console.log(
      "Generated comment for genres:",
      topGenres,
      "->",
      generatedText
    );

    return NextResponse.json({
      comment: generatedText.trim(),
      genres: topGenres,
    });
  } catch (error) {
    console.error("Error generating witty comment:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

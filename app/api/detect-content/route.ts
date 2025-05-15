import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // Ensure text length is within Sapling's limits if necessary
    // Current limit is 200,000 characters according to their docs
    if (text.length > 5000) {
        return NextResponse.json({ error: 'Text exceeds maximum length of 5,000 characters.' }, { status: 413 });
    }

    const saplingApiKey = process.env.SAPLING_API_KEY;

    if (!saplingApiKey) {
      console.error('Sapling API key is not configured.');
      // Avoid exposing detailed error messages about API keys to the client in production
      return NextResponse.json({ error: 'AI detection service is not configured.' }, { status: 500 });
    }

    const saplingResponse = await fetch('https://api.sapling.ai/api/v1/aidetect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: saplingApiKey,
        text: text,
        sent_scores: true, // Returns sentence-level scores, default is true
        // score_string: false, // Set to true if you want HTML string with heatmap, default is false
        // version: "20240606" // Optionally specify a model version, default is latest
      }),
    });

    if (!saplingResponse.ok) {
      let errorData;
      try {
        errorData = await saplingResponse.json();
      } catch (e) {
        // If response is not JSON, use status text
        errorData = { msg: saplingResponse.statusText };
      }
      console.error('Sapling API Error:', errorData);
      return NextResponse.json(
        { error: `AI detection service error: ${errorData.msg || saplingResponse.statusText}` },
        { status: saplingResponse.status }
      );
    }

    const data = await saplingResponse.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error in /api/detect-content:', error);
    let errorMessage = 'An unexpected error occurred while processing your request.';
    if (error instanceof Error) {
        // Avoid sending generic Error.message to client if it might contain sensitive info
        // For now, we'll send it but in prod you might want generic messages for some errors
        errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 
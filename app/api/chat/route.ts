import { NextRequest, NextResponse } from "next/server";

interface ChatRequest {
  message: string;
}

interface ChatResponse {
  response: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();

    if (!body.message || typeof body.message !== "string") {
      return NextResponse.json(
        { error: "Message is required and must be a string" },
        { status: 400 }
      );
    }

    const backendUrl = process.env.BACKEND_URL || "http://localhost:3100";

    const response = await fetch(`${backendUrl}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // TO DO: Maybe add microsoft outlook authentication header
      },
      body: JSON.stringify({
        message: body.message,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend error:", response.status, errorText);

      return NextResponse.json(
        { error: "Backend service unavailable" },
        { status: 502 }
      );
    }

    const data: ChatResponse = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("API route error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

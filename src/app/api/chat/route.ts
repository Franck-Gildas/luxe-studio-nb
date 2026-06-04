import Anthropic from "@anthropic-ai/sdk";
import { CAP_SYSTEM_PROMPT } from "@/lib/cap-system-prompt";

// [RECOMMENDATION] blocks are parsed and stripped client-side in Concierge.tsx

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function isValidMessages(messages: unknown): messages is ChatMessage[] {
  if (!Array.isArray(messages) || messages.length === 0) return false;
  return messages.every(
    (msg) =>
      msg &&
      typeof msg === "object" &&
      (msg.role === "user" || msg.role === "assistant") &&
      typeof msg.content === "string" &&
      msg.content.trim().length > 0
  );
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "Chat service is not configured." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { messages } = body;

    if (!isValidMessages(messages)) {
      return Response.json(
        { error: "Invalid messages format." },
        { status: 400 }
      );
    }

    const client = new Anthropic({ apiKey });

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 512,
      system: CAP_SYSTEM_PROMPT,
      messages: messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    });

    const block = response.content[0];
    const content = block.type === "text" ? block.text.trim() : "";

    if (!content) {
      return Response.json(
        { error: "No response from assistant." },
        { status: 500 }
      );
    }

    return Response.json({ content });
  } catch {
    return Response.json(
      { error: "Unable to process your message right now." },
      { status: 500 }
    );
  }
}

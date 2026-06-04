import Anthropic from "@anthropic-ai/sdk";
import {
  isServiceId,
  type QuizRecommendation,
} from "@/lib/quiz-catalog";
import type { QuizLang } from "@/lib/quiz-content";
import { getQuizSystemPrompt } from "@/lib/quiz-system-prompt";

function isValidLang(lang: unknown): lang is QuizLang {
  return lang === "en" || lang === "fr";
}

function isValidAnswers(answers: unknown): answers is string[] {
  return (
    Array.isArray(answers) &&
    answers.length === 5 &&
    answers.every((a) => typeof a === "string" && a.trim().length > 0)
  );
}

function extractJson(text: string): string {
  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  return fenced ? fenced[1].trim() : trimmed;
}

function parseRecommendation(raw: string): QuizRecommendation | null {
  try {
    const parsed = JSON.parse(extractJson(raw)) as Record<string, unknown>;

    if (
      typeof parsed.service !== "string" ||
      !isServiceId(parsed.serviceId) ||
      typeof parsed.tagline !== "string" ||
      typeof parsed.description !== "string" ||
      typeof parsed.addonReason !== "string" ||
      !Array.isArray(parsed.addons) ||
      !parsed.addons.every((a) => typeof a === "string")
    ) {
      return null;
    }

    return {
      service: parsed.service.trim(),
      serviceId: parsed.serviceId,
      tagline: parsed.tagline.trim(),
      description: parsed.description.trim(),
      addons: parsed.addons.map((a) => (a as string).trim()),
      addonReason: parsed.addonReason.trim(),
    };
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "Quiz service is not configured." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { answers, lang: rawLang } = body;
    const lang: QuizLang = isValidLang(rawLang) ? rawLang : "en";

    if (!isValidAnswers(answers)) {
      return Response.json(
        { error: "Invalid answers format. Expected 5 non-empty strings." },
        { status: 400 }
      );
    }

    const userMessage = answers
      .map((answer, i) => `Q${i + 1}: ${answer}`)
      .join("\n");

    const client = new Anthropic({ apiKey });

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 512,
      system: getQuizSystemPrompt(lang),
      messages: [{ role: "user", content: userMessage }],
    });

    const block = response.content[0];
    const text = block.type === "text" ? block.text.trim() : "";

    if (!text) {
      return Response.json(
        { error: "No response from advisor." },
        { status: 500 }
      );
    }

    const recommendation = parseRecommendation(text);

    if (!recommendation) {
      return Response.json(
        { error: "Unable to parse recommendation." },
        { status: 500 }
      );
    }

    return Response.json({ recommendation });
  } catch {
    return Response.json(
      { error: "Unable to process your quiz right now." },
      { status: 500 }
    );
  }
}

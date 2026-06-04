const BLOCK_RE = /\[RECOMMENDATION\]([\s\S]*?)\[\/RECOMMENDATION\]/;
const ALLOWED_IDS = new Set([
  "hair",
  "barber",
  "nails",
  "lash",
  "skin",
  "wellness",
]);

export type ServiceRecommendation = {
  serviceId: string;
  serviceName: string;
  price: number;
  duration: string;
  reason: string;
};

export type ParsedEliseMessage = {
  displayText: string;
  recommendation: ServiceRecommendation | null;
};

function isValidRecommendation(value: unknown): value is ServiceRecommendation {
  if (!value || typeof value !== "object") return false;
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.serviceId === "string" &&
    ALLOWED_IDS.has(obj.serviceId) &&
    typeof obj.serviceName === "string" &&
    obj.serviceName.trim().length > 0 &&
    typeof obj.price === "number" &&
    Number.isFinite(obj.price) &&
    obj.price >= 0 &&
    typeof obj.duration === "string" &&
    obj.duration.trim().length > 0 &&
    typeof obj.reason === "string" &&
    obj.reason.trim().length > 0
  );
}

/** Strip [RECOMMENDATION] block from assistant text; parse JSON when valid. */
export function parseRecommendation(raw: string): ParsedEliseMessage {
  const trimmed = raw.trim();
  const match = BLOCK_RE.exec(trimmed);
  if (!match) {
    return { displayText: trimmed, recommendation: null };
  }

  const displayText = trimmed.replace(BLOCK_RE, "").trim();
  try {
    const parsed: unknown = JSON.parse(match[1].trim());
    if (!isValidRecommendation(parsed)) {
      return { displayText: trimmed, recommendation: null };
    }
    return {
      displayText,
      recommendation: {
        serviceId: parsed.serviceId,
        serviceName: parsed.serviceName.trim(),
        price: parsed.price,
        duration: parsed.duration.trim(),
        reason: parsed.reason.trim(),
      },
    };
  } catch {
    return { displayText: trimmed, recommendation: null };
  }
}

import type { SharePlatform } from "@/lib/share-ritual";

type SharePlatformIconProps = {
  platform: SharePlatform;
};

export function SharePlatformIcon({ platform }: SharePlatformIconProps) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    "aria-hidden": true as const,
  };

  switch (platform) {
    case "facebook":
      return (
        <svg {...common}>
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case "messenger":
      return (
        <svg {...common}>
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...common}>
          <path
            d="M12 2C6.5 2 2 6.2 2 11.4c0 1.8.5 3.5 1.4 5L2 22l5.8-1.5c1.5.8 3.2 1.2 4.9 1.2 5.5 0 10-4.2 10-9.4S17.5 2 12 2z"
            strokeLinejoin="round"
          />
          <path d="M8.5 10.5c.4 1.8 2.2 3.5 4 4" strokeLinecap="round" />
        </svg>
      );
    case "tiktok":
      return (
        <svg {...common}>
          <path d="M9 12a4 4 0 1 0 4 4V4l5 2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "twitter":
      return (
        <svg {...common}>
          <path d="M4 4l16 16M20 4L4 20" strokeLinecap="round" />
        </svg>
      );
    case "telegram":
      return (
        <svg {...common}>
          <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

export const SHARE_PLATFORMS: {
  id: SharePlatform;
  label: string;
}[] = [
  { id: "facebook", label: "Facebook" },
  { id: "messenger", label: "Messenger" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "tiktok", label: "TikTok" },
  { id: "twitter", label: "Twitter / X" },
  { id: "telegram", label: "Telegram" },
];

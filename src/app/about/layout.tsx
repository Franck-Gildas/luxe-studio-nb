import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Atelier",
  description:
    "The story of Luxe Studio NB — a house of quiet on Rue Main Street, Moncton. Six private rooms, twenty-two senior artists.",
  openGraph: {
    title: "The Atelier",
    description: "The story and philosophy behind Luxe Studio NB.",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

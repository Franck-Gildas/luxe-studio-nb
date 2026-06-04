import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Your Ritual",
  description:
    "Reserve your ritual at Luxe Studio NB. Choose your service, artist, and time. We respond within the hour.",
  openGraph: {
    title: "Book Your Ritual",
    description:
      "Reserve your beauty or wellness ritual at Luxe Studio NB.",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

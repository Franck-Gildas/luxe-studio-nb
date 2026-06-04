import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Ritual",
  description:
    "Every visit follows the same five quiet movements. The Welcome, The Consultation, The Ritual, The Finish, The After.",
  openGraph: {
    title: "The Ritual",
    description:
      "The five quiet movements of every Luxe Studio NB experience.",
  },
  alternates: {
    canonical: "/experiences",
  },
};

export default function ExperiencesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

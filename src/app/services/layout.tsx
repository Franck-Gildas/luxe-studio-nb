import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Six Rituals",
  description:
    "Signature Hair Rituals, Barbering Atelier, Nail Couture, Lash & Brow, Esthetics & Skin, Wellness & Body. From $95.",
  openGraph: {
    title: "Six Rituals",
    description:
      "Explore the six beauty and wellness rituals at Luxe Studio NB.",
  },
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Where Beauty Becomes Ritual",
  description:
    "Luxe Studio NB — A private beauty atelier in Moncton NB. Six private rooms, one artist per guest. Hair, skin, wellness and more. By appointment only.",
  openGraph: {
    title: "Where Beauty Becomes Ritual",
    description:
      "A private beauty atelier in Moncton NB. Six private rooms, one artist per guest.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

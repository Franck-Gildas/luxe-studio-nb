import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transformations",
  description:
    "Selected before and after transformations from the chair at Luxe Studio NB, Moncton.",
  openGraph: {
    title: "Transformations",
    description:
      "Before and after transformations from Luxe Studio NB.",
  },
  alternates: {
    canonical: "/work",
  },
};

export default function WorkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

import { redirect } from "next/navigation";
import {
  isRitualCategorySlug,
  RITUAL_CATEGORY_SLUGS,
} from "@/data/services-menu";

export function generateStaticParams() {
  return RITUAL_CATEGORY_SLUGS.map((serviceId) => ({ serviceId }));
}

/** Pre-render the six QR slugs; unknown slugs still hit this page when dynamicParams is true. */
export const dynamicParams = true;

type PageProps = {
  params: Promise<{ serviceId: string }>;
};

export default async function ServiceCategoryDeepLinkPage({
  params,
}: PageProps) {
  const { serviceId } = await params;

  if (!isRitualCategorySlug(serviceId)) {
    redirect("/services");
  }

  redirect(`/services?ritual=${serviceId}`);
}

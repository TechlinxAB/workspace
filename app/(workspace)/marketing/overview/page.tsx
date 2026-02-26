import { RoutePlaceholder } from "@/components/route-placeholder";
import { routeContent } from "@/lib/mockData";

export default function MarketingOverviewPage() {
  const copy = routeContent["/marketing/overview"];
  return <RoutePlaceholder title={copy.title} description={copy.description} />;
}


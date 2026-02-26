import { RoutePlaceholder } from "@/components/route-placeholder";
import { routeContent } from "@/lib/mockData";

export default function MarketingRequestsPage() {
  const copy = routeContent["/marketing/requests"];
  return <RoutePlaceholder title={copy.title} description={copy.description} />;
}


import { RoutePlaceholder } from "@/components/route-placeholder";
import { routeContent } from "@/lib/mockData";

export default function WebsiteRequestsPage() {
  const copy = routeContent["/website/requests"];
  return <RoutePlaceholder title={copy.title} description={copy.description} />;
}


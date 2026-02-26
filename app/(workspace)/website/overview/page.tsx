import { RoutePlaceholder } from "@/components/route-placeholder";
import { routeContent } from "@/lib/mockData";

export default function WebsiteOverviewPage() {
  const copy = routeContent["/website/overview"];
  return <RoutePlaceholder title={copy.title} description={copy.description} />;
}


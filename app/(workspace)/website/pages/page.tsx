import { RoutePlaceholder } from "@/components/route-placeholder";
import { routeContent } from "@/lib/mockData";

export default function WebsitePagesPage() {
  const copy = routeContent["/website/pages"];
  return <RoutePlaceholder title={copy.title} description={copy.description} />;
}


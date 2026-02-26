import { RoutePlaceholder } from "@/components/route-placeholder";
import { routeContent } from "@/lib/mockData";

export default function AdminOverviewPage() {
  const copy = routeContent["/admin/overview"];
  return <RoutePlaceholder title={copy.title} description={copy.description} />;
}


import { RoutePlaceholder } from "@/components/route-placeholder";
import { routeContent } from "@/lib/mockData";

export default function AdminRequestsPage() {
  const copy = routeContent["/admin/requests"];
  return <RoutePlaceholder title={copy.title} description={copy.description} />;
}


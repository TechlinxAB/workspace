import { RoutePlaceholder } from "@/components/route-placeholder";
import { routeContent } from "@/lib/mockData";

export default function AdminClientsPage() {
  const copy = routeContent["/admin/clients"];
  return <RoutePlaceholder title={copy.title} description={copy.description} />;
}


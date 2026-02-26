import { RoutePlaceholder } from "@/components/route-placeholder";
import { routeContent } from "@/lib/mockData";

export default function RequestsInboxPage() {
  const copy = routeContent["/requests/inbox"];
  return <RoutePlaceholder title={copy.title} description={copy.description} />;
}


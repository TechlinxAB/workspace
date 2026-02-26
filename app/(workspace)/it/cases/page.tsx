import { RoutePlaceholder } from "@/components/route-placeholder";
import { routeContent } from "@/lib/mockData";

export default function ItCasesPage() {
  const copy = routeContent["/it/cases"];
  return <RoutePlaceholder title={copy.title} description={copy.description} />;
}


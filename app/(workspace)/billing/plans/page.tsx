import { RoutePlaceholder } from "@/components/route-placeholder";
import { routeContent } from "@/lib/mockData";

export default function BillingPlansPage() {
  const copy = routeContent["/billing/plans"];
  return <RoutePlaceholder title={copy.title} description={copy.description} />;
}


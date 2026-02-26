import { RoutePlaceholder } from "@/components/route-placeholder";
import { routeContent } from "@/lib/mockData";

export default function BillingInvoicesPage() {
  const copy = routeContent["/billing/invoices"];
  return <RoutePlaceholder title={copy.title} description={copy.description} />;
}


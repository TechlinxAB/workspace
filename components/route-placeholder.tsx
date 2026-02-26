import { Card } from "@/components/Card";

type RoutePlaceholderProps = {
  title: string;
  description: string;
};

export function RoutePlaceholder({ title, description }: RoutePlaceholderProps) {
  return (
    <main className="space-y-5">
      <section>
        <h1 className="text-[20px] font-bold text-ink">{title}</h1>
        <p className="mt-1 text-sm text-muted">{description}</p>
      </section>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="text-[15px] font-bold text-ink">Workspace section</h2>
          <p className="mt-2 text-sm text-muted">
            This route is scaffolded and ready for feature-specific widgets, charts, and tables.
          </p>
        </Card>
        <Card>
          <h3 className="text-[15px] font-bold text-ink">Quick notes</h3>
          <p className="mt-2 text-sm text-muted">
            Keep using shared components to maintain the Techlinx premium style across modules.
          </p>
        </Card>
      </div>
    </main>
  );
}

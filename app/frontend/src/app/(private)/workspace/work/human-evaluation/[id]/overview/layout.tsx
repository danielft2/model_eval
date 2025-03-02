import { ScrollArea } from "@/components/ui/scroll-area";
import { Sidebar } from "@/features/work/human-evaluations/components/evaluation-details/sidebar";

export default function HumanEvaluationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex gap-5 h-full">
      <Sidebar />
      <ScrollArea className="flex-1 pt-6" style={{ height: "calc(100vh - 212px)" }}>
        {children}
      </ScrollArea>
    </section>
  );
}

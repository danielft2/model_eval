import { Divider } from "@/components/ui/divider";
import { HumanEvaluationDetailsHeader } from "@/features/work/human-evaluations/components/evaluation-details/evaluation-header";

export default function HumanEvaluationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex flex-col">
      <HumanEvaluationDetailsHeader />
      <Divider className="mt-6" />
      <main className="flex-1 gap-5">
        {children}
      </main>
    </div>
  );
}

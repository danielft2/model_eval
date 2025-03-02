import { ChildrenProps } from "@/@types/children-props";
import { Button } from "@/components/ui/button";
import { ShowConditional } from "@/components/ui/show-conditional";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { ChevronDown, ChevronUp } from "lucide-react";

type EvaluationMetricsAccordionProps = ChildrenProps & {
  label: string;
  activeAccordion: string;
  accordionValue: string;
};

export function MetricAccordion({
  activeAccordion,
  accordionValue,
  label,
  children,
}: EvaluationMetricsAccordionProps) {
  return (
    <AccordionItem
      value={accordionValue}
      className="p-3 border border-slate-300 rounded-lg space-y-2"
    >
      <div className="flex items-center justify-between">
        <label
          htmlFor={accordionValue}
          className="font-medium font-heading -tracking-wider text-slate-900 text-[15px]"
        >
          {label}
        </label>
        <AccordionTrigger asChild>
          <Button
            size="icon"
            variant={
              activeAccordion === accordionValue ? "default" : "evaluate"
            }
            className="size-7"
          >
            <ShowConditional
              condition={activeAccordion === accordionValue}
              then={<ChevronUp />}
              otherwise={<ChevronDown />}
            />
          </Button>
        </AccordionTrigger>
      </div>
      <AccordionContent className="text-slate-600 text-sm font-medium font-body max-w-[95%]">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}

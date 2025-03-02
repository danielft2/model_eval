import { ChildrenProps } from "@/@types/children-props";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ShowConditional } from "@/components/ui/show-conditional";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

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
  const { control } = useFormContext();

  return (
    <AccordionItem
      value={accordionValue}
      className="p-4 bg-slate-100 rounded-lg space-y-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Controller
            name={`use_${accordionValue}`}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                id={accordionValue}
                checked={value}
                onCheckedChange={onChange}
                defaultChecked={false}
              />
            )}
          />
          <label
            htmlFor={accordionValue}
            className="font-medium font-heading -tracking-wider text-slate-900 text-[15px]"
          >
            {label}
          </label>
        </div>
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
      <AccordionContent className="text-slate-700 text-sm font-medium font-body max-w-[95%]">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}

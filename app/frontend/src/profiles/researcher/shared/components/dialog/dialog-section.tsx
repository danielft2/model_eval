import { ChildrenProps } from "@/@types/children-props";
import { FileSpreadsheet } from "lucide-react";

function DialogSectionRoot({ children }: ChildrenProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="size-8 bg-brand-700 rounded-full flex items-center justify-center">
        <FileSpreadsheet className="text-white" size={16} />
      </div>

      <div>{children}</div>
    </div>
  );
}

function DialogSectionTitle({ children }: ChildrenProps) {
  return (
    <h2 className="text-slate-800 font-heading font-medium -tracking-wider">
      {children}
    </h2>
  );
}

function DialogSectionDescription({ children }: ChildrenProps) {
  return (
    <p className="text-slate-600 font-body font-medium text-sm">
      {children}
    </p>
  );
}

export const DialogSection = {
  Content: DialogSectionRoot,
  Title: DialogSectionTitle,
  Description: DialogSectionDescription,
}
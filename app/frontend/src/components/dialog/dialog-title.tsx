import { DialogClose, DialogTitle as DialogTitleRadix } from "@radix-ui/react-dialog";
import { X } from "lucide-react";

type ModalTitleProps = {
  children: React.ReactNode;
}

export function DialogTitle({ children }: ModalTitleProps) {
  return (
    <DialogTitleRadix className="flex justify-between items-center text-slate-900 border-b border-slate-300 pb-4 mb-6">
      <span className="font-medium font-heading -tracking-wider text-lg">
        {children}
      </span>
      <DialogClose asChild>
        <button>
          <X size={20} />
        </button>
      </DialogClose>
    </DialogTitleRadix>
  );
}

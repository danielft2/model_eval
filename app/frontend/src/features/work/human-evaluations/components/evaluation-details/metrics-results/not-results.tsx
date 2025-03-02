import { CircleAlert } from "lucide-react";

export function NotResults() {
  return (
    <div className="flex justify-center items-center mt-10 text-slate-700 gap-1">
      <CircleAlert size={16} className="text-orange-700"/>
      <h1 className=" text-sm font-heading -tracking-wider font-medium">
        Nenhuma avaliação encontrada até o momento.
      </h1>
    </div>
  );
}

import { LoaderCircle } from "lucide-react";

export function LoadingFullScreen() {
  return (
    <div className="flex items-center justify-center h-screen">
      <LoaderCircle className="animate-spin text-brand-700" size={32} />
    </div>
  );
}

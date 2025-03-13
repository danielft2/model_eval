'use client'

import { useLoadingStore } from "@/shared/stores/loading-store";

export function IndeterminateBar() {
  const isLoading = useLoadingStore(state => state.isLoading);

  return (
    <>
      {isLoading && (
        <div className="w-full fixed top-0">
          <div className="h-1 w-full bg-brand-100 overflow-hidden">
            <div className="progress w-full h-full bg-brand-400 left-right"></div>
          </div>
        </div>
      )}
    </>
  );
}

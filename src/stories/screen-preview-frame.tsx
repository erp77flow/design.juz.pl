import type { ReactNode } from "react";

export function ScreenPreviewFrame({ children }: { children: ReactNode }) {
  return (
    <div className="juz-screen-preview-frame bg-background p-8">
      {children}
    </div>
  );
}

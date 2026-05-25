import * as React from "react";
import { cn } from "@/lib/utils";

type PhoneDevice = "iphone" | "android";

interface PhoneFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  device?: PhoneDevice;
  children?: React.ReactNode;
}

const deviceStyles: Record<PhoneDevice, { frame: string; screen: string; notch: React.ReactNode }> = {
  iphone: {
    frame:
      "rounded-[2.75rem] border-[10px] border-foreground bg-foreground p-2 shadow-juz-lg",
    screen: "relative overflow-hidden rounded-[2rem] bg-background",
    notch: (
      <div className="pointer-events-none absolute left-1/2 top-2 z-10 flex h-7 w-32 -translate-x-1/2 items-center justify-center rounded-full bg-foreground" />
    ),
  },
  android: {
    frame:
      "rounded-[2rem] border-[8px] border-foreground bg-foreground p-1.5 shadow-juz-lg",
    screen: "relative overflow-hidden rounded-[1.5rem] bg-background",
    notch: (
      <div className="pointer-events-none absolute left-1/2 top-3 z-10 size-2.5 -translate-x-1/2 rounded-full bg-foreground" />
    ),
  },
};

const PhoneFrame = React.forwardRef<HTMLDivElement, PhoneFrameProps>(
  ({ device = "iphone", className, children, ...props }, ref) => {
    const styles = deviceStyles[device];
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full max-w-[22rem] aspect-[9/19]",
          styles.frame,
          className
        )}
        aria-label={device === "iphone" ? "Podgląd iPhone" : "Podgląd Android"}
        {...props}
      >
        <div className={cn("size-full", styles.screen)}>
          {styles.notch}
          <div className="size-full overflow-auto">{children}</div>
        </div>
      </div>
    );
  }
);
PhoneFrame.displayName = "PhoneFrame";

export { PhoneFrame };
export type { PhoneFrameProps, PhoneDevice };

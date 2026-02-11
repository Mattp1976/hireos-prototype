import { cn } from "@/lib/utils";

function ResizablePanelGroup({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex h-full w-full", className)} {...props}>
      {children}
    </div>
  );
}

function ResizablePanel({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex-1", className)} {...props}>
      {children}
    </div>
  );
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { withHandle?: boolean }) {
  return (
    <div
      className={cn("bg-border relative flex w-px items-center justify-center", className)}
      {...props}
    >
      {withHandle && (
        <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground">
            <circle cx="12" cy="9" r="1" /><circle cx="19" cy="9" r="1" /><circle cx="5" cy="9" r="1" />
            <circle cx="12" cy="15" r="1" /><circle cx="19" cy="15" r="1" /><circle cx="5" cy="15" r="1" />
          </svg>
        </div>
      )}
    </div>
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };

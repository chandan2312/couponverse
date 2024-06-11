import { cn } from "../../lib/utils";
import React from "react";

const SectionWrapper = ({
  children,
  title,
  className,
}: {
  children: any;
  title: any;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        className,
        "w-full bg-card rounded-md shadow-sm border border-muted/50 mb-4",
      )}
    >
      <h3 className="bg-accent/90 text-accent-foreground rounded-t-md  p-2 font-semibold ">
        {title}
      </h3>

      <div className="p-2 text-sm">{children}</div>
    </div>
  );
};

export default SectionWrapper;

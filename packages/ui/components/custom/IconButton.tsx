import { cn } from "../../lib/utils";
import React from "react";

const IconButton = ({
  children,
  className,
  onClick,
  disabled = false,
}: {
  children: any;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  return (
    <div
      className={cn(
        "w-7 h-7 flex items-center justify-center border border-muted rounded-full  hover:bg-accent active:bg-accent hover:text-accent-foreground active:text-accent-foreground cursor-pointer ",
        className,
      )}
      onClick={!disabled ? onClick : undefined}
    >
      {children}
    </div>
  );
};

export default IconButton;

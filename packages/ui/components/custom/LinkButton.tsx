import { cn } from "../../lib/utils";
import Link from "next/link";
import React from "react";

const LinkButton = ({
  link,
  text,
  className,
}: {
  link: string;
  text: string;
  className?: string;
}) => {
  return (
    <Link
      href={link}
      className={cn(
        "flex my-4 items-center text-sm rounded-full px-4 bg-accent2/70 border border-b-4 border-b-accent2/90 text-accent2-foreground hover:border-b-accent2/70  active:border-b-accent2/70 ",
        className,
      )}
    >
      {text}
    </Link>
  );
};

export default LinkButton;

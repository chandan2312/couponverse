import Link from "next/link";
import React from "react";

const LinkButton = ({ link, text }: { link: string; text: string }) => {
  return (
    <Link
      href={link}
      className="text-sm rounded-full px-4 bg-accent2/70 border border-b-4 border-b-accent2/90 text-accent2-foreground hover:border-b-accent2/70  active:border-b-accent2/70 "
    >
      {text}
    </Link>
  );
};

export default LinkButton;

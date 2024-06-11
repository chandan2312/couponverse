"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { cn, getProtocol } from "../../lib/utils";
import { Search, X } from "lucide-react";

const NavbarSearch = ({ lang }: { lang: string }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBar, setSearchBar] = useState(false);
  const protocol = getProtocol();

  if (searchTerm.length < 3) {
  }

  const router = useRouter();
  const pushLink = `${process.env.PROTOCOL}${process.env.DOMAIN}/search/${searchTerm}`;

  const handleSearch = () => {
    if (searchBar) {
      router.push(pushLink);
    } else {
      setSearchBar(true);
    }
  };

  const handleSubmit = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      router.push(pushLink);
    }
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    router.push(pushLink);
  };

  return (
    <>
      <form className="flex items-center gap-2" onSubmit={handleFormSubmit}>
        <Input
          placeholder="Search here"
          className={cn(
            !searchBar ? "hidden" : "flex",
            "gap-1 h-8 bg-muted/20 border border-background/30 text-foreground/70 rounded-lg px-2 py-1 w-full focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2 focus:ring-offset-background focus:outline-none my-1.5",
          )}
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          onKeyDown={handleSubmit}
        />

        <span className="cursor-pointer" onClick={() => handleSearch()}>
          <Search size={18} />
        </span>
        <span
          className={cn(!searchBar ? "hidden" : "flex", "cursor-pointer")}
          onClick={() => setSearchBar(false)}
        >
          <X size={18} />
        </span>
      </form>
    </>
  );
};

export default NavbarSearch;

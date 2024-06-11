import Link from "next/link";
import React from "react";
import { cn } from "../../lib/utils";

type Props = {
  tabs: {
    name: string;
    value: string;
    count: number;
  }[];
  searchParams: { tab: string };
};

const TabSelector = ({ tabs, searchParams }: Props) => {
  const paramsTab = searchParams.tab;
  return (
    <>
      <div className=" max-lg:sticky max-lg:top-0 flex mx-2 gap-3  rounded-md ">
        {tabs.map((tab, index) => {
          return (
            <Link
              href={`?tab=${tab.value}`}
              key={index}
              className={cn(
                "border border-muted/50  rounded-md px-2 py-1 m-1 bg-muted/20",

                paramsTab === tab.value || (!paramsTab && index === 0)
                  ? "bg-accent/70 text-accent-foreground"
                  : "text-primary",
              )}
            >
              <span>
                {tab.name} ({tab.count})
              </span>
            </Link>
          );
        })}
      </div>

      {/* ----------end */}
    </>
  );
};

export default TabSelector;

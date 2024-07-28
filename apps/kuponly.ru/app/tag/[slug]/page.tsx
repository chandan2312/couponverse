import React from "react";
import TagPage from "@repo/ui/pages/TagPage";

const TagpageApp = ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) => {
  const slug = params.slug;
  return <TagPage slug={slug} searchParams={searchParams} />;
};

export default TagpageApp;

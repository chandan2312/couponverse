import React from "react";
import StorePage from "@repo/ui/pages/StorePage";
import { storePageMetaData } from "@repo/ui/lib/metaDataGenerator";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
  const meta = storePageMetaData(params.slug);
  return meta;
}

const StorePageApp = ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) => {
  const slug = params.slug;
  const storePath = params.storePath;
  return (
    <StorePage slug={slug} storePath={storePath} searchParams={searchParams} />
  );
};

export default StorePageApp;

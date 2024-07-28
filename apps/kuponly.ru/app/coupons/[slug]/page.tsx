import React from "react";
import StorePage from "@repo/ui/pages/StorePage";
import { storePageMetaData } from "@repo/ui/lib/metaDataGenerator";
import { fetchStorePageData } from "@repo/ui/lib/fetchData";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
  const slug = params.slug;
  const data = await fetchStorePageData(slug);
  if (!data) {
    return notFound();
  }
  const meta = storePageMetaData(data);
  return meta;
}

const StorePageApp = async ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) => {
  const slug = params.slug;
  const data = await fetchStorePageData(slug);

  if (!data) {
    return notFound();
  }
  return <StorePage data={data} slug={slug} searchParams={searchParams} />;
};

export default StorePageApp;

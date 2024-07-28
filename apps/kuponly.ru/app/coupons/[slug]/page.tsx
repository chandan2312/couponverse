import React from "react";
import StorePage from "@repo/ui/pages/StorePage";
import { storePageMetaData } from "@repo/ui/lib/metaDataGenerator";
import { fetchStorePageData } from "@repo/ui/actions/store";
import { notFound } from "next/navigation";

// Fetch data once per request
async function fetchData(slug: string) {
  const allData = await fetchStorePageData(slug);
  if (!allData) {
    return null;
  }
  return allData;
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
  const data = await fetchData(params.slug);
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
  const data = await fetchData(slug);

  if (!data) {
    return notFound();
  }
  return <StorePage data={data} slug={slug} searchParams={searchParams} />;
};

export default StorePageApp;

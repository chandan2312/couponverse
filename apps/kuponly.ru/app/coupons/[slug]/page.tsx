import React from "react";
import StorePage from "@repo/ui/pages/StorePage";
import { storePageMetaData } from "@repo/ui/lib/metaDataGenerator";
import { fetchStorePageData } from "@repo/ui/actions/store";
import { notFound } from "next/navigation";

let data: any;

// Create a function to fetch data once
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
  data = await fetchData(params.slug);
  if (!data) {
    return notFound();
  }
  const meta: any = storePageMetaData(data);
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

  if (!data) {
    return notFound();
  }
  return <StorePage data={data} slug={slug} searchParams={searchParams} />;
};

export default StorePageApp;

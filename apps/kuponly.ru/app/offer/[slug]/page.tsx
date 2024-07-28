import React from "react";
import OfferPage from "@repo/ui/pages/OfferPage";
import { offerPageMetaData } from "@repo/ui/lib/metaDataGenerator";
import { fetchOfferPageData } from "@repo/ui/lib/fetchData";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
  const slug = params.slug;
  const data = await fetchOfferPageData(slug);
  if (!data) {
    return notFound();
  }
  const meta = offerPageMetaData(data);
  return meta;
}

const OfferPageApp = async ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) => {
  const slug = params.slug;
  const data = await fetchOfferPageData(slug);
  if (!data) {
    return notFound();
  }
  return <OfferPage data={data} slug={slug} searchParams={searchParams} />;
};

export default OfferPageApp;

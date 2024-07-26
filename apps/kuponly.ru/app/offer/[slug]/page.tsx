import React from "react";
import OfferPage from "@repo/ui/pages/OfferPage";
import { offerPageMetaData } from "@repo/ui/lib/metaDataGenerator";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
  const slug = params.slug;
  const meta = offerPageMetaData(slug);
  return meta;
}

const OfferPageApp = ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) => {
  const slug = params.slug;
  return <OfferPage slug={slug} searchParams={searchParams} />;
};

export default OfferPageApp;

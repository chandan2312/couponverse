import React from "react";
import StoreLetterListPage from "@repo/ui/pages/StoreLetterListPage";
import { storeListMetaData } from "@repo/ui/lib/metaDataGenerator";

export async function generateMetadata() {
  const meta = storeListMetaData();
  return meta;
}

const StoreListLetter = ({ params }: { params: any }) => {
  const letter = params.letter;
  return <StoreLetterListPage letter={letter} />;
};

export default StoreListLetter;

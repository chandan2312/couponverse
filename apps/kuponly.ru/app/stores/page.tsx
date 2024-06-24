import React from "react";
import StoreListPage from "@repo/ui/pages/StoreListPage";
import { storeListMetaData } from "@repo/ui/lib/metaDataGenerator";

// export async function generateMetadata() {
//   const meta = storeListMetaData();
//   return meta;
// }

const StoreList = () => {
  return <StoreListPage />;
};

export default StoreList;

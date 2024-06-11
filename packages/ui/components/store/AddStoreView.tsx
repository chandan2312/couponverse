"use client";

import { addStoreView } from "../../actions/store";
import React, { useEffect, useState } from "react";

const AddStoreView = ({ storeId }: { storeId: any }) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [visitedStores, setVisitedStores] = useState([]);

  const store = visitedStores.find(
    (store: any) =>
      store.id === storeId && store.time > Date.now() - 1000 * 60 * 60 * 24,
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const visitedStoresJson = localStorage.getItem("visitedStores");
      const localVisitedStores = visitedStoresJson
        ? JSON.parse(visitedStoresJson)
        : [];
      setVisitedStores(localVisitedStores);

      const store = localVisitedStores.find(
        (store: any) =>
          store.id === storeId && store.time > Date.now() - 1000 * 60 * 60 * 24,
      );

      if (!store) {
        (async () => {
          console.log("callinng addStoreView");
          const res = await addStoreView(storeId);

          if (res.status === 200) {
            setIsUpdated(true);
            localVisitedStores.push({ id: storeId, time: Date.now() });
            localStorage.setItem(
              "visitedStores",
              JSON.stringify(localVisitedStores),
            );
          }
        })();
      }
    }
  }, []);

  return <></>;
};

export default AddStoreView;

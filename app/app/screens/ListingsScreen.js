import React, { useEffect, useState } from "react";
import listingApi from "../services/listings";

import AppListingItems from "../components/lists/AppListingItems";

function ListingsScreen({ navigation }) {
  let [items, setItems] = useState([]);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    const { data: items, ok: response } = await listingApi.getListings();
    if (!response) return;

    console.log(items);
    setItems(items);
  };

  return <AppListingItems items={items} />;
}

export default ListingsScreen;

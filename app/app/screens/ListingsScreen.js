import React, { useEffect, useState } from "react";
import openSocket from "socket.io-client";
import listingApi from "../services/listings";

import AppListingItems from "../components/lists/AppListingItems";

function ListingsScreen({ navigation }) {
  let [items, setItems] = useState([]);
  const [fetched, setFetched] = useState(false);

  let listings = [];

  useEffect(() => {
    const socket = openSocket("http://192.168.1.13:9000");
    if (!fetched) fetchListings();

    connectToListing(socket);
  }, []);

  const connectToListing = (socket) => {
    socket.on("listing", (date) => {
      if (date.action === "create") createListing(date.listing);
      if (date.action === "delete") deleteListing(date.listing);
      if (date.action === "update") updateListing(date.listing);
    });
  };

  const fetchListings = async () => {
    const { data: items, ok: response } = await listingApi.getListings();
    if (!response) return;

    listings = items.slice(0);
    setItems(items);
    setFetched(true);
  };

  const createListing = (listing) => {
    listings.unshift(listing);

    setItems(() => [...[], ...listings]);
  };

  const updateListing = (listing) => {
    let newListings = listings.slice(0);
    newListings.map((obj) => {
      if (obj.listingId === listing.listingId) {
        obj.title = listing.title;
        obj.price = listing.price;
        obj.category = listing.category;
        obj.description = listing.description;
      }
    });

    setItems(newListings);
  };

  const deleteListing = (listing) => {
    listings = listings.filter(function (obj) {
      return obj.listingId !== listing.listingId;
    });

    setItems(() => [...[], ...listings]);
  };

  return <AppListingItems items={items} handleRefresh={fetchListings} />;
}

export default ListingsScreen;

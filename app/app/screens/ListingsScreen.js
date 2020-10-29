import React from "react";
import AppListingItems from "../components/lists/AppListingItems";

function ListingsScreen({ navigation }) {
  const items = [
    {
      image: require("../assets/couch.jpg"),
      title: "Couch",
      price: "350",
      id: 1,
    },
    {
      image: require("../assets/jacket.jpg"),
      title: "Red Jacket",
      price: "150",
      id: 2,
    },
    {
      image: require("../assets/jacket.jpg"),
      title: "Red Jacket",
      price: "150",
      id: 3,
    },
  ];
  return <AppListingItems items={items} />;
}

export default ListingsScreen;

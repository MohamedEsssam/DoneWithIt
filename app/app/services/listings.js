import client from "./client";

const endpoint = "/listing";

const getListings = () => {
  return client.get(`${endpoint}`);
};

const getListing = (listingId) => {
  return client.get(`${endpoint}/${listingId}`);
};

const addListing = (listing) => {
  return client.post(`${endpoint}`, listing);
};

//********************************************************************** */
//TODO in the future it's super easy but i have to finish my military service :'( pray for me
//********************************************************************** */
const updateListing = (listing) => {};
const deleteListing = (listing) => {};

export default {
  getListings,
  getListing,
  addListing,
  updateListing,
  deleteListing,
};

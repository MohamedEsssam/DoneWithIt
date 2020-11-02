import client from "./client";

const endpoint = "/listing";

const getListings = () => {
  return client.get(`${endpoint}`);
};

const getListing = (listingId) => {
  return client.post(`${endpoint}/${listingId}`);
};

const addListing = (listing) => {
  return client.post(`${endpoint}`, user);
};

export default {
  getListings,
  getListing,
  addListing,
};

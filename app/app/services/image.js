import client from "./client";

const endpoint = "/image";

const PostImage = (listingId, image) => {
  return client.post(`${endpoint}`, { ...{ uuid: listingId }, image });
};

//********************************************************************** */
//TODO in the future it's super easy but i have to finish my military service :'( pray for me
//********************************************************************** */
const updateImage = (listing) => {};
const deleteImage = (listing) => {};

export default {
  PostImage,
  updateImage,
  deleteImage,
};

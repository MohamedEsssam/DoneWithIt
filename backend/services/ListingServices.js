const sql = require("../startup/connectDB");

class ListingServices {
  async getListings() {
    const query =
      "SELECT BIN_TO_UUID(listingId) AS listingId, title, price, category, description, BIN_TO_UUID(userId) AS userId FROM listing";

    return new Promise((resolve, reject) => {
      sql.query(query, (err, result, field) => {
        if (err) throw err;

        resolve(result);
      });
    });
  }
  async getListing(listingId) {
    const query =
      "SELECT BIN_TO_UUID(listingId) AS listingId, title, price, category, description, BIN_TO_UUID(userId) AS userId, u.name, u.email, (SELECT COUNT(listingId) FROM listing WHERE userId = l.userId) AS listingsCount FROM listing l JOIN user u USING (userId) WHERE listingId = UUID_TO_BIN(?);";

    return new Promise((resolve, reject) => {
      sql.query(query, [listingId], (err, result, field) => {
        if (err) throw err;

        resolve(result[0]);
      });
    });
  }
  async updateListing(userId, listingId) {}
  async deleteListing(userId, listingId) {}
}

module.exports = ListingServices;

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

  async getUserListings(userId) {
    const query =
      "SELECT BIN_TO_UUID(listingId) AS listingId, title, price, category, description, BIN_TO_UUID(userId) AS userId FROM listing WHERE userId = UUID_TO_BIN(?)";

    return new Promise((resolve, reject) => {
      sql.query(query, [userId], (err, result, field) => {
        if (err) throw err;

        resolve(result);
      });
    });
  }
  async getListing(listingId) {
    if (!this.validId(listingId)) return;

    const query =
      "SELECT BIN_TO_UUID(listingId) AS listingId, title, price, category, description, BIN_TO_UUID(userId) AS userId, u.name, u.email, (SELECT COUNT(listingId) FROM listing WHERE userId = l.userId) AS listingsCount FROM listing l JOIN user u USING (userId) WHERE listingId = UUID_TO_BIN(?);";

    return new Promise((resolve, reject) => {
      sql.query(query, [listingId], (err, result, field) => {
        if (err) throw err;

        resolve(result[0]);
      });
    });
  }

  async createListing(title, price, category, description, userId) {
    const listingId = await this.generateId();

    if (!this.validId(userId) || !this.validId(listingId)) return;

    const query =
      "INSERT INTO listing (listingId, title, price, category, description, userId) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, UUID_TO_BIN(?));";
    sql.query(query, [listingId, title, price, category, description, userId]);

    return await this.getListingById(listingId);
  }

  generateId() {
    return new Promise((resolve, reject) => {
      sql.query("SELECT UUID() AS listingId", (err, result, field) => {
        if (err) reject(err);

        resolve(result[0].listingId);
      });
    });
  }

  async getListingById(listingId) {
    const query =
      "SELECT BIN_TO_UUID(listingId) AS listingId, title, price, category, description, BIN_TO_UUID(userId) AS userId FROM listing WHERE listingId = UUID_TO_BIN(?)";

    return new Promise((resolve, reject) => {
      sql.query(query, [listingId], (err, result, field) => {
        if (err) throw err;

        resolve(result[0]);
      });
    });
  }

  validId(id) {
    const uuidRegex = /^[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}$/;

    return uuidRegex.test(id);
  }

  //********************************************************************** */
  //TODO in the future it's super easy but i have to finish my military service :'( pray for me
  //********************************************************************** */
  async updateListing(userId, listingId) {}
  async deleteListing(userId, listingId) {}
}

module.exports = ListingServices;

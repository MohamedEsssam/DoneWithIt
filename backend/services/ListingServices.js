const sql = require("../startup/connectDB");

class ListingServices {
  async getListings() {
    const query =
      "SELECT BIN_TO_UUID(listingId) AS listingId, title, price, category, description, BIN_TO_UUID(userId) AS userId FROM listing ORDER BY postedDate DESC";

    return new Promise((resolve, reject) => {
      sql.query(query, (err, result, field) => {
        if (err) throw err;

        resolve(result);
      });
    });
  }

  async getUserListings(userId) {
    const query =
      "SELECT BIN_TO_UUID(listingId) AS listingId, title, price, category, description, BIN_TO_UUID(userId) AS userId FROM listing WHERE userId = UUID_TO_BIN(?) ORDER BY postedDate DESC";

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
      "INSERT INTO listing (listingId, title, price, category, description, postedDate, userId) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, NOW(), UUID_TO_BIN(?));";
    sql.query(query, [listingId, title, price, category, description, userId]);

    return await this.getListingById(listingId);
  }

  async updateListing(
    listingId,
    userId,
    { title, price, category, description }
  ) {
    if (!this.validId(listingId)) return;
    if (!this.validId(userId)) return;

    let updateFields = "";
    if (title) updateFields = updateFields.concat(`title='${title}',`);
    if (price) updateFields = updateFields.concat(`price='${price}',`);
    if (category) updateFields = updateFields.concat(`category='${category}',`);
    if (description)
      updateFields = updateFields.concat(`description='${description}',`);

    updateFields =
      updateFields.substring(updateFields.length - 1, updateFields.length) ===
      ","
        ? updateFields.slice(0, -1)
        : updateFields;

    const query =
      "UPDATE listing SET " +
      updateFields.trim() +
      ` WHERE listingId=UUID_TO_BIN(?) AND userId=UUID_TO_BIN(?)`;

    sql.query(query, [listingId, userId], (err, result, field) => {
      if (err) throw err;
    });

    return await this.getListingById(listingId);
  }

  async deleteListing(listingId, userId) {
    if (!this.validId(listingId)) return;
    if (!this.validId(userId)) return;

    const listing = await this.getListingById(listingId);
    if (!listing) return;

    sql.query(
      "DELETE FROM listing WHERE listingId = UUID_TO_BIN(?) AND userId = UUID_TO_BIN(?);",
      [listingId, userId],
      (err, result) => {
        if (err) throw err;
      }
    );

    return listing;
  }

  /*******************************************************************
   *                     Helper Methods                              *
   ******************************************************************/
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
}

module.exports = ListingServices;

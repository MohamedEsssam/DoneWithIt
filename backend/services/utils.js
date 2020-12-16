const sql = require("../startup/connectDB");

const generateId = () => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT UUID() AS listingId", (err, result, field) => {
      if (err) reject(err);

      resolve(result[0].listingId);
    });
  });
};

const validId = (id) => {
  const uuidRegex = /^[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}$/;

  return uuidRegex.test(id);
};

module.exports = {
  generateId: generateId,
  validId: validId,
};

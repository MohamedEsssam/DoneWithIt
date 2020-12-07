const sql = require("../startup/connectDB");
const bcrypt = require("bcrypt");
const AuthServices = require("./AuthServices");
const AuthServicesInstance = new AuthServices();

class UserServices {
  async login(email, password) {
    const user = await this.getUserByEmail(email);
    if (!user) return;
    if (!(await this.checkPassword(password, user.password))) return;

    delete user["password"];

    const token = AuthServicesInstance.generateToken(user);

    return token;
  }

  async register(name, email, password) {
    let user = await this.getUserByEmail(email);
    if (user) return;

    const hashedPassword = await this.hashPassword(password);

    const query =
      "INSERT INTO user (userId, name, email, password) VALUES (UUID_TO_BIN(UUID()), ?, ?, ?)";

    sql.query(query, [name, email, hashedPassword], (err, result, field) => {
      if (err) throw err;
    });

    user = await this.getUserByEmail(email);

    const token = AuthServicesInstance.generateToken(user);

    return token;
  }

  /*******************************************************************
   *                     Helper Methods                              *
   ******************************************************************/
  async getUserById(userId) {
    const query = "SELECT * FROM user WHERE userId = UUID_TO_BIN(?)";

    return new Promise((resolve, reject) => {
      sql.query(query, [userId], (err, result, field) => {
        if (err) reject(err);

        resolve(result[0]);
      });
    });
  }

  getUserByEmail(email) {
    let query =
      "SELECT BIN_TO_UUID(userId) AS userId, name, email, password FROM user WHERE email = ? ;";

    return new Promise((resolve, reject) => {
      sql.query(query, [email], (err, result, field) => {
        if (err) reject(err);

        resolve(result[0]);
      });
    });
  }

  async checkPassword(password, userPassword) {
    return bcrypt.compare(password, userPassword);
  }

  async hashPassword(password) {
    const genSalt = await bcrypt.genSalt(10);

    return bcrypt.hash(password, genSalt);
  }
}

module.exports = UserServices;

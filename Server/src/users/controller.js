const pool = require("../../db");
const queries = require("../users/queries");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../../utils/jwtGenerator");

const createNewUser = async (req, res) => {
  try {
    const { user_name, user_email, user_password } = req.body;

    const user = await pool.query(queries.checkUserEmail, [user_email]);
    if (user.rows.length > 0) {
      return res.status(401).send("User already exists!");
    }

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(user_password, salt);

    const newUser = await pool.query(queries.createNewUser, [
      user_name,
      user_email,
      bcryptPassword,
    ]);
   
    // Generate jwt token
    const token = jwtGenerator(newUser.rows[0].user_id);

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  createNewUser,
};

const pool = require("../../db");
const queries = require("../users/queries");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../../utils/jwtGenerator");

const registerNewUser = async (req, res) => {
  try {
    const { user_name, user_email, user_password } = req.body;

    const user = await pool.query(queries.checkUserEmail, [user_email]);
    if (user.rows.length > 0) {
      return res.status(401).send("User already exists!");
    }

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(user_password, salt);

    const newUser = await pool.query(queries.registerNewUser, [
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

const loginUser = async (req, res) => {
  try {
    const { user_email, user_password } = req.body;

    const user = await pool.query(queries.checkUserEmail, [user_email]);
    if (user.rows.length === 0) {
      return res.status(401).send("Password or Email incorrect");
    }

    const validPassword = await bcrypt.compare(
      user_password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).send("Password or Email incorrect");
    }

    const token = jwtGenerator(newUser.rows[0].user_id);

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const verifyUser = async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const getDashboard = async (req, res) => {
  try {
    
    const user = await pool.query(queries.getUserById, [req.user]);

    res.json(user.rows)

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  registerNewUser,
  loginUser,
  verifyUser,
  getDashboard,
};

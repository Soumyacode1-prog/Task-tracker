const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");

const SALT_ROUNDS = 10;

const getReadableDbError = (error) => {
  if (error.code === "42P01") {
    return "Database tables are missing. Run the schema setup from README.";
  }

  if (error.code === "3D000") {
    return "Database does not exist. Create the PostgreSQL database first.";
  }

  if (error.code === "28P01") {
    return "PostgreSQL authentication failed. Update DB_USER/DB_PASSWORD.";
  }

  if (error.code === "ECONNREFUSED") {
    return "Cannot connect to PostgreSQL. Check DB_HOST/DB_PORT and database status.";
  }

  return "Database operation failed.";
};

const signup = async (req, res) => {
  const { email, password } = req.body;

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: "Server configuration error: JWT_SECRET is not set" });
  }

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const existingUser = await pool.query("SELECT id FROM users WHERE email = $1", [email]);

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const createdUser = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
      [email, hashedPassword]
    );

    const user = createdUser.rows[0];
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(201).json({ token });
  } catch (error) {
    // Log the actual failure for local debugging while returning safe messages to the client.
    console.error("Signup error:", error);
    return res.status(500).json({ message: getReadableDbError(error) });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: "Server configuration error: JWT_SECRET is not set" });
  }

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const userResult = await pool.query("SELECT id, email, password FROM users WHERE email = $1", [email]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = userResult.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: getReadableDbError(error) });
  }
};

module.exports = {
  signup,
  login,
};

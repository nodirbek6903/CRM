const jwt = require("jsonwebtoken");

const VALID_LOGIN = "admin" || "Admin" || "ADMIN";
const VALID_PASSWORD = "903646903";
const SECRET_KEY = "2003";

// Login funksiyasi
const login = (req, res) => {
  const { username, password } = req.body;

  if (username === VALID_LOGIN && password === VALID_PASSWORD) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "24h" });
    return res.status(200).json({ token });
  }

  return res.status(401).json({ message: "Login yoki parol noto'g'ri" });
};

module.exports = { login };

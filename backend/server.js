const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;

// middleware
app.use(cors());
app.use(bodyParser.json());

// Static login and parol
const VALID_LOGIN = "admin" || "Admin" || "ADMIN"
const VALID_PASSWORD = "903646903";
const SECRET_KEY = "2003";

//login endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (username === VALID_LOGIN && password === VALID_PASSWORD) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "24h" });
    return res.status(200).json({ token });
  }

  return res.status(401).json({message: "Login yoki parol noto'g'ri"})
});

// himoyalangan route uchun ( faqat sinash uchun)
app.get("api/dashboard", (req,res) => {
    const authHeader = req.headers.authorization

    if(authHeader){
        const token = authHeader.split(" ")[1]

        jwt.verify(token, SECRET_KEY, (err, user) => {
            if(err){
                return res.status(403).json({message: "Token noto'g'ri yoki muddati o'tgan"})
            }

            return res.status(200).json({message: "Dashboard malumotlari", user})
        })
    } else{
        return res.status(401).json({message: "Token taqdim etilmagan"})
    }
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})

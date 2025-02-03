const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const courseRoutes = require("./routes/courseRoutes");
const groupRoutes = require("./routes/groupRoutes");
const studentRoutes = require("./routes/studentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes")
const paymentRoutes = require("./routes/paymentsRoutes")
const { login } = require("./auth/Login");

const app = express();
const PORT = 5000;
const SECRET_KEY = "secret_key_2003"; // Maxfiy kalit (raqam bo'lishi shart emas)

// MongoDB Atlas ulanish URI

const MONGO_URI =
  "mongodb+srv://Nodirbek:Nodirbek6903@cluster0.oqnlp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Atlas ga ulanish muvaffaqiyatli!");
  })
  .catch((err) => {
    console.error("MongoDB Atlas ga ulanishda xato:", err.message);
  });

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Login endpoint
app.post("/api/login", login);

// Dashboard API
app.get("/api/dashboard", (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Token noto'g'ri yoki muddati o'tgan" });
      }

      return res.status(200).json({ message: "Dashboard ma'lumotlari", user });
    });
  } else {
    return res.status(401).json({ message: "Token taqdim etilmagan" });
  }
});

// Kurslar API
app.use("/api/courses", courseRoutes)
// group API
app.use("/api/groups", groupRoutes)
// student API
app.use("/api/students", studentRoutes);

// Davomat API
app.use("/api/attendance", attendanceRoutes)
// To'lov API
app.use("/api/students", paymentRoutes)




// Serverni ishga tushirish 
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

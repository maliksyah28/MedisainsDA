require("dotenv/config");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 6969;
const cors = require("cors");
const bearerToken = require("express-bearer-token");
const fs = require("fs");

// Check if the "public/brand" directory exists, and create it if not
if (!fs.existsSync("./public/brand")) {
  fs.mkdirSync("./public/brand", { recursive: true });
}

//Config
app.use(cors());
app.use(bearerToken());
app.use("/public", express.static("public"));
app.use(express.json({ limit: "10mb" }));

//started
app.get("/api", (req, res) => {
  res.send(`Hello, this is my API start yunan`);
});

// Routers
const {
  authRouters,
  userRouters,
  companyRouters,
  brandRouters,
} = require("./routers");

app.use("/auth", authRouters);
app.use("/user", userRouters);
app.use("/company", companyRouters);
app.use("/brand", brandRouters);

// Error Handler
app.use((error, req, res, next) => {
  console.log({ error });
  const errorObj = { status: "ERROR", message: error.message, detail: error };
  const httpCode = typeof error.code == "number" ? error.code : 500;
  res.status(httpCode).send(errorObj);
});

app.listen(PORT, (error) => {
  if (error) {
    console.log(`ERROR: ${error.message}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});

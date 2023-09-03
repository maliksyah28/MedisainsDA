require("dotenv").config();
const jsonToken = require("jsonwebtoken");
const secretWord = process.env.JWT_SECRET;

const createToken = (payload) => jsonToken.sign(payload, secretWord);
const verifyToken = (token) => jsonToken.verify(token, secretWord);

module.exports = { createToken, verifyToken };

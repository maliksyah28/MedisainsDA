const multer = require("multer");
const path = require("path");
const appRoot = require("app-root-path");

const brandPath = path.join(appRoot.path, "public", "brand");

const storageUser = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, brandPath);
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const uploadBrand = multer({
  storage: storageUser,
  limits: {
    fileSize: 2097152, // Byte, 2 MB
  },
});

module.exports = {
  uploadBrand,
};

const express = require("express");
const multer = require("multer");
const path = require("path");
const httpErrors = require("http-errors");
const FileRouter = express.Router();

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });
FileRouter.post("/", upload.single("file"), (req, res, next) => {
  try {
    if (!req.file) {
      throw httpErrors(400, "File is required");
    }
    res.status(200).json({
      message: "File uploaded successfully",
      data: {
        filename: req.file.filename,
        path: req.file.path,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = FileRouter;

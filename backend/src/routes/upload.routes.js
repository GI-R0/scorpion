import express from "express";
import { upload } from "../config/cloudinary.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", protect, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: "No se ha subido ninguna imagen" });
  }
  res.json({ url: req.file.path });
});

export default router;

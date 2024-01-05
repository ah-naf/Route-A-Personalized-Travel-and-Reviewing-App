import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
const prisma = new PrismaClient();

import fs from "fs";
import AuthRoute from "../routes/auth";
import BookmarkRoute from "../routes/bookmark";
import PlaceReviewRoute from "../routes/placeReview";
import ReviewRoute from "../routes/review";
import RoutePostRoute from "../routes/route";
import SearchRoute from "../routes/search";

import multer from "multer";
// import { cloudinary, storage } from "../cloudinaryConfig";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // console.log(file);
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
  })
);
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: ["http://172.24.0.3:5173", "http://localhost:5173"],
    credentials: true,
  })
);

app.use("/api/auth", AuthRoute);
app.use("/api/route", RoutePostRoute);
app.use("/api/review", ReviewRoute);
app.use("/api/search", SearchRoute);
app.use("/api/bookmark", BookmarkRoute);
app.use("/api/placeReview", PlaceReviewRoute);

app.post("/upload", upload.single("image"), async (req, res) => {
  if (req.file) {
    return res
      .status(200)
      .json(`http://localhost:5000/upload/${req.file.filename}`);
  }
});

app.get("/upload/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const readStream = fs.createReadStream(`uploads/${imageName}`);
  readStream.pipe(res);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

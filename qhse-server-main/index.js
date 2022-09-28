import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/users.js";
import OrganismRouter from "./routes/organisms.js";
import ProductRouter from "./routes/products.js";
import RawRouter from "./routes/raws.js";
import FournisseurRouter from "./routes/Fournisseurs.js";
import PersonnelRouter from "./routes/personnels.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import ZoneRouter from "./routes/zones.js";
import EquipementRouter from "./routes/Equipements.js";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
//__dirname sert a donne le path au root en dependant sur la machine locale dont on execute ce code.
const __dirname = path.dirname(__filename);
const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const storageImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const storageFile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/files");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const uploadImage = multer({ storage: storageImage });
const uploadFile = multer({ storage: storageFile });
app.post("/api/upload/image", uploadImage.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});
app.post("/api/upload/file", uploadFile.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});
app.get("/api/download/:id", async (req, res) => {
  const filePath = path.join(__dirname, "public/files", req.params.id);
  const stream = fs.createReadStream(filePath);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    'inline; filename="' + req.params.id.slice(13) + '"'
  );

  stream.pipe(res);
});
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/api/user", userRouter);
app.use("/api/organism", OrganismRouter);
app.use("/api/fournisseur", FournisseurRouter);
app.use("/api/product", ProductRouter);
app.use("/api/raw", RawRouter);
app.use("/api/personnel", PersonnelRouter);
app.use("/api/zone", ZoneRouter);
app.use("/api/equipement", EquipementRouter);
const CONNECTION_URL =
  "mongodb://qhse:qhse@ac-otxh6bb-shard-00-00.y8ttzlq.mongodb.net:27017,ac-otxh6bb-shard-00-01.y8ttzlq.mongodb.net:27017,ac-otxh6bb-shard-00-02.y8ttzlq.mongodb.net:27017/?ssl=true&replicaSet=atlas-vserub-shard-0&authSource=admin&retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));

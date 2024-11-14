import express from "express";
import dotenv from "dotenv";
import mongoose, { mongo } from "mongoose";
import { router } from "./routes/routes.js";
import { initDefaultPersos } from "./controllers/persoControllers.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB).then(() => {
  console.log("Connecté à MongoDB");
  initDefaultPersos();
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Le serveur est lancé sur le port ${PORT} !`);
});

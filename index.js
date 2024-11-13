import express from "express";
import dotenv from "dotenv";
import { router } from "./routes/routes.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Le serveur est lancé sur le port ${PORT} !`);
});

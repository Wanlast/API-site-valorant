import dotenv from "dotenv";
dotenv.config();
import express from "express";

import mongoose, { mongo } from "mongoose";
import { initDefaultPersos } from "./controllers/persoControllers.js";

import routes from "./routes/routes.js";
import privateRoutes from "./routes/privateRoutes.js";
import passport from "passport";

import "./auth/auth.js";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB).then(() => {
  console.log("Connecté à MongoDB");
  initDefaultPersos();
});

app.use(
  "/private",
  passport.authenticate("jwt", { session: false }),
  privateRoutes
);

app.use(routes);

app.listen(PORT, () => {
  console.log(`Le serveur est lancé sur le port ${PORT} !`);
});

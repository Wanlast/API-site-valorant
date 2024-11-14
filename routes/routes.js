import express from "express";
import {
  getPersos,
  addPerso,
  getPerso,
  updatePerso,
  deletePerso,
} from "../controllers/persoControllers.js";
import { catchErrors } from "../helper.js";

export const router = express.Router();

router.get("/persos", catchErrors(getPersos));

router.get("/perso/:name", catchErrors(getPerso));

router.post("/perso", catchErrors(addPerso));

router.patch("/perso/:name", catchErrors(updatePerso));

router.delete("/perso/:name", catchErrors(deletePerso));

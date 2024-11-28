import express from "express";

import {
  addPerso,
  updatePerso,
  deletePerso,
} from "../controllers/persoControllers.js";
import { catchErrors } from "../helper.js";

const router = express.Router();

router.post("/perso", catchErrors(addPerso));

router.patch("/perso/:name", catchErrors(updatePerso));

router.delete("/perso/:name", catchErrors(deletePerso));

router.get("/secret", (req, res) => {
  res.json({
    message: "Successfully connected to Secret.",
    user: req.user,
    token: req.query.token,
  });
});

export default router;

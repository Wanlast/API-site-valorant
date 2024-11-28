import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { getPersos, getPerso } from "../controllers/persoControllers.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import { catchErrors } from "../helper.js";

const router = express.Router();

router.get("/persos", catchErrors(getPersos));

router.get("/perso/:name", catchErrors(getPerso));

// Authentification

router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({
      message: "Signup successful",
      user: req.user,
    });
  }
);

router.post("/login", (req, res, next) => {
  passport.authenticate("login", { session: false }, async (err, user) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");
        return next(error);
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET);
        res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

export default router;

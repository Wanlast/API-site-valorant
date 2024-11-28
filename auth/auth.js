import passport from "passport";
import { Strategy } from "passport-local";
import UserModel from "../models/userModel.js";
import JWT from "passport-jwt";
const { Strategy: JWTstrategy, ExtractJwt } = JWT;

passport.use(
  "signup",
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
          return done(null, false, {
            message: "Email is already used",
          });
        }
        const user = await UserModel.create({ email, password });
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "login",
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email });

        if (!user) {
          return done(null, false, {
            message: "User or Password is incorrect",
          });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, {
            message: "User or Password is incorrect",
          });
        }
        return done(null, user, {
          message: "Login successful",
        });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter("token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;

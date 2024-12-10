import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import "dotenv/config";
import { userService } from "../services/user.services.js";

const strategyConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

const verifyToken = async (jwt_payload, done) => {
  if (!jwt_payload) return done(null, false, { messages: "User not found" });
  return done(null, jwt_payload);
};

passport.use("jwt", new JwtStrategy(strategyConfig, verifyToken));

//obtener el token usando cookies usar esta para la entrega

const cookiesExtrator = (req) => {
  return req.cookies.token;
};

const strategyCookiesConfig = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookiesExtrator]),
  secretOrKey: process.env.SECRET_KEY,
};

passport.use("current", new JwtStrategy(strategyCookiesConfig, verifyToken));

// fin de obtener por cookies

passport.serializeUser((user, done) => {
  try {
    done(null, user._id);
  } catch (error) {
    done(error);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userService.getById(id);
    return done(null, user);
  } catch (error) {
    done(error);
  }
});

import express from "express";
import session from 'express-session'
import cookieParser from "cookie-parser";
import handlebars from 'express-handlebars';
import usersRouter from "./routes/users.router.js";
import apiRouter from "./routes/api.router.js";
import viewsRouter from './routes/views.router.js';
import { initMongoDB } from "./db/connection.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import 'dotenv/config';
import { __dirname } from "./utils.js";
import MongoStore from 'connect-mongo'
import passport from "passport";
import './passport/jwt.js'

const app = express();

const storeConfig = {
  store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      crypto: { secret: process.env.SECRET_KEY },
      ttl: 180,
  }),
  secret: process.env.SECRET_KEY,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 180000 }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());
app.use(session(storeConfig));

app.use(passport.initialize());
app.use(passport.session());

// Configuración de Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

// Rutas
app.use("/users", usersRouter);
app.use("/api", apiRouter);
app.use('/', viewsRouter);

// Ruta personalizada para /user
app.get("/user", (req, res) => {
  res.render("user");
});

app.use(errorHandler);

initMongoDB().then(()=>console.log('base de datos conectada'))
  .catch((error)=>console.log(error))

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Escuchando al puerto ${PORT}`);
});

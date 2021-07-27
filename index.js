//jshint esversion:6
const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const mongoose = require("mongoose");
const app = express();
const passport = require("passport");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

//winston logger
const logger = require("./src/Utils/logger");

//helmet to set various HTTP headers for security
const helmet = require("helmet");
app.use(helmet());

//to include the .env environment variables
dotenv.config();

// to enable cross origin resource sharing i.e. to provide data to different domain
// app.use(
//     cors({
//         origin: process.env.REACT_DOMAIN,
//         credentials: true,
//     })
// );

//env variables
const PORT = process.env.PORT;

//routes for autentication
const authroutes = require("./src/routes/auth");

//parsing
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//database
mongoose
  .connect(process.env.DBSTRING, { // url of the mongodb database
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((err) => {
    next(err);
  });

//database mongoose model to perform authentication on
const User = require("./src/models/user");

//passport authentication config
require("./src/Utils/passport")(session, mongoose, passport, app, User);

//logging the requests
app.use(function (req, res, next) {
  logger.info(req);
  next();
});

//api routes
app.use("/api", authroutes);

//main get route of the front end page
//here html file of react app is set to root route  
app.use(express.static(path.join(__dirname,"client", "build")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname,"client", "build", "index.html"));
});

//error
app.use(function (err, req, res, next) {
    logger.logError(err);
    res.status(500).send("Error! Kindly Reload the page");
});

//handling the node errors
process.on("uncaughtException", (err) => {
    logger.logError(err.message);
    logger.info(err);
    process.exit(1);
});

//configuring the port for the app
app.listen(PORT, console.log(`Listening at ${PORT}`));

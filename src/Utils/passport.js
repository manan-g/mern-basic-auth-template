//passport and express-session
//create strategy
//define verify callback function (verify the user and send the user object)
//use the passport.authenticate in login route
//make a salt and hash generator in register route

//in logout use req.logout()
//in protected route check by req.isAuthentticated

module.exports = function (session, mongoose, passport, app, User) {
  //session database mongostore
  const mongostore = require("connect-mongodb-session")(session);

  //session for passport authentication
  //configuring mongodb based database for storing sessions
  const store = new mongostore({
    uri: process.env.DBSTRING,
    collection: "MySessions",
  });

  //configuring the session middleware
  app.use(
    session({
      name: "session",
      secret: process.env.SECRET,
      cookie: {
        // secure: true,
        // httpOnly: true,
        // domain: process.env.COOKIE_DOMAIN,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        // samesite: "none",
        // secure: true,
      },
      store: store,
      resave: false,
      saveUninitialized: false,
    })
  );

  //passport
  //initializing passport every time
  app.use(passport.initialize());
  app.use(passport.session());

  //PassportLocalMongoose add these functions to the user model
  //this function creates the stratedy, stratedy contains the function to validate the user
  passport.use(User.createStrategy());

  //serialize function is used to create cookies to maintain sessions
  passport.serializeUser(User.serializeUser());

  //deserialize is used to validate the cookie and authenticate the user
  passport.deserializeUser(User.deserializeUser());
};

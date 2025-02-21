const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const users = require("./models/users");
const userRoute = require("./routes/usersManagement");
const jobTypeRoute = require("./routes/JobTypeManagement");
const loginRoute = require("./routes/login");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jobsRoute = require("./routes/JobsManagement");

const app = express();

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));

app.use(express.json());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
    store: MongoStore.create({
      mongoUrl: "mongodb://root:root@mongo:27017/records?authSource=admin",
      collectionName: 'sessions'
    })
  })
);

app.use(passport.initialize());
app.use(passport.session());


passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await users.findOne({ username: username }).exec();
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await users.findById(id).exec();
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

app.use("/login", loginRoute);
app.use(isAuthenticated);
app.use("/users", userRoute);
app.use("/jobTypes", jobTypeRoute);
app.use("/jobs", jobsRoute);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// Connect to MongoDB
mongoose
  .connect("mongodb://root:root@mongo:27017/records?authSource=admin")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));
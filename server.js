const express = require("express");
const cors = require("cors");
var logout = require("express-passport-logout");
const passport = require("passport");
const GithubStrategy = require("passport-github").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
var LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const keys = require("./config/index");
const chalk = require("chalk");

let user = {};

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

//Github Stratergy
passport.use(
  new GithubStrategy(
    {
      clientID: keys.GITHUB.clientID,
      clientSecret: keys.GITHUB.clientSecret,
      callbackURL: "/auth/github/callback",
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(chalk.blue(JSON.stringify(profile)));
      user = { ...profile };
      return cb(null, profile);
    }
  )
);

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.GOOGLE.clientID,
      clientSecret: keys.GOOGLE.clientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(chalk.blue(JSON.stringify(profile)));
      user = { ...profile };
      return cb(null, profile);
    }
  )
);
//Linkedin Stratergy

passport.use(
  new LinkedInStrategy(
    {
      clientID: keys.LINKEDIN.clientID,
      clientSecret: keys.LINKEDIN.clientSecret,
      callbackURL: "/auth/linkedin/callback",
      scope: ["r_emailaddress", "r_liteprofile"],
      passReqToCallback: true,
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(chalk.blue(JSON.stringify(profile)));
      user = { ...profile };
      return cb(null, profile);
    }
  )
);
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(cors());
app.use(passport.initialize());

//Github
app.get("/auth/github", passport.authenticate("github"));
app.get(
  "/auth/github/callback",
  passport.authenticate("github"),
  (req, res) => {
    console.log(res);
    res.redirect("/profile");
  }
);
app.get("/profile", (req, res) => {
  res.send(user);
});

//Google
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("/profile");
  }
);
//linkedin

app.get("/auth/linkedin", passport.authenticate("linkedin"));

app.get(
  "/auth/linkedin/callback",
  passport.authenticate("linkedin"),
  (req, res) => {
    res.redirect("/profile");
  }
);

//userinfo
app.get("/user", (req, res) => {
  console.log("getting user data!");
});

app.get("/auth/logout", (req, res) => {
  logout();
  console.log("logging out!");
  user = {};
  res.redirect(301, "http://localhost:3000/");
});
app.listen(5000);

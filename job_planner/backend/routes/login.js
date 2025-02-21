const express = require("express");
const passport = require("passport");
const router = express.Router();

router.post("/", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send("Login failed: " + info.message);
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.session.save((err) => {
        if (err) {
          console.error("Session save error:", err);
          return next(err);
        }
        return res.status(200).send("Login successful");
      });
    });
  })(req, res, next);
});

router.get("/check", (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).send("User is logged in");
  } else {
    return res.status(401).send("User is not logged in");
  }
});

router.get('/current', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
      return next(err);
    }
    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        return next(err);
      }
      console.log("Session after logout:", req.session);
      return res.status(200).send("Logout successful");
    });
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

// Step 1: Redirect user to Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Step 2: Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, role: req.user.role, name: req.user.name },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Redirect to frontend with token
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    res.redirect(`${clientUrl}/auth/callback?token=${token}`);

  }
);

const authMiddleware = require("../middleware/auth.middleware");

const authController = require("../controllers/auth.controller");

router.get("/me", authMiddleware(), (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

router.put("/me", authMiddleware(), authController.updateProfile);

module.exports = router;

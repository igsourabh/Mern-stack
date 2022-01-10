const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');

// Create a User using: POST "/api/auth/". Doesn't require Auth
router.post(
  "/createUser",
  // this is the end point for auth .js
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],

  async (req, res) => {
    // using express validatr
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // wrap this code in try cath method
    try {
      // using async await mather rather then express validtor defalut promises
      let user = await User.findOne({ email: req.body.email });
      // if user has ame emale in database then is programe not run it will stpe here
      if (user) {
        return res
          .status(400)
          .json({ error: "user of this emails has bee alreay exist" });
      }
      const salt=await bcrypt.genSalt(10)
      const secPass=await bcrypt.hash(req.body.password, salt);

      // create user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      res.json(user);
    } catch (error) {
      // if some error occured catch will give some console error
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);

module.exports = router;
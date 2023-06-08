const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
function authRoutes(app) {
  app.post("/signup", async (req, res) => {
    const { name, mobile, email, password } = req.body;
    try {
      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "Email already exists" });
      } else {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user

        const user = new User({
          name,
          mobile,
          email,
          password: hashedPassword,
        });

        await user.save();

        return res.status(201).json({ message: "Signup successful" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error occurred while signing up" });
    }
  });

  // Login route

  app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
      // Find the user by email

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Compare the passwords

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.status(200).json({ message: "Login successful" });



    } catch (error) {
      res.status(500).json({ message: "Error occurred while logging in" });
    }
  });
}

module.exports = authRoutes;

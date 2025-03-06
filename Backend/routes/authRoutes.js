// const express = require("express");
// const bcrypt = require("bcrypt");
// const User = require("../models/User");

// const router = express.Router();

// // User Registration (Signup)
// router.post("/signup", async (req, res) => {
//   try {
//     const { name, email, password, phone, address, newPassword } = req.body;

//     let user = await User.findOne({ email });

//     if (user) {
//       if (newPassword) {
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(newPassword, salt);
//         await user.save();
//         return res.status(200).json({ message: "Password updated successfully!" });
//       }
//       return res.status(400).json({ message: "User already exists!" });
//     }

//     const newUser = new User({ name, email, password, phone, address });
//     await newUser.save();

//     res.status(201).json({ message: "User registered successfully!", user: newUser });
//   } catch (error) {
//     res.status(500).json({ error: "Server Error" });
//   }
// });

// // User Login (Signin)
// router.post("/signin", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: "Invalid email or password!" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid email or password!" });
//     }

//     res.status(200).json({ message: "Login successful!", user });
//   } catch (error) {
//     res.status(500).json({ error: "Server Error" });
//   }
// });

// // Password Change
// router.post("/change-password", async (req, res) => {
//   try {
//     const { email, oldPassword, newPassword } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "User not found!" });

//     const isMatch = await bcrypt.compare(oldPassword, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Incorrect old password!" });

//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(newPassword, salt);
//     await user.save();

//     res.status(200).json({ message: "Password changed successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: "Server Error" });
//   }
// });

// module.exports = router;

const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

// User Registration (Signup)
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phone, country, state, city, pincode, address1, address2 } = req.body;
    
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const newUser = new User({ name, email, password, phone, country, state, city, pincode, address1, address2 });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// User Login
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    res.status(200).json({ message: "Login successful!", user });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;

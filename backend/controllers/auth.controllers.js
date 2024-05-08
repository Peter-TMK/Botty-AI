import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password don't match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ Error: "Username already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfileImg = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfileImg = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      confirmPassword,
      gender,
      profileImage: gender === "male" ? boyProfileImg : girlProfileImg,
    });

    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      fullname: newUser.fullName,
      username: newUser.username,
      profileImage: newUser.profileImage,
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = (req, res) => {
  res.send("Login Route");
};

export const logout = (req, res) => {
  res.send("Logout Route");
};

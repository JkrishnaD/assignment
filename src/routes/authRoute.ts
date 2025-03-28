import jwt  from 'jsonwebtoken';
import express from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import dbConnection from '../config/db';

export const authRouter = express();

authRouter.post("/signup", async (req, res) => {
  try {
    await dbConnection();
    const { name, email, address, password, bio, profilePicture } = req.body;

    if (!name || !email || !address || !password) {
      res.status(400).json({ message: "Please fill all fields" });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      address,
      password: hashedPassword,
      bio,
      profilePicture,
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    await dbConnection();
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Please fill all fields" });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(400).json({ message: "Invalid Credentials" });
      return;
    }

    const verifyPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!verifyPassword) {
      res.status(400).json({ message: "Incorrect Password" });
      return;
    }

    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET as string
    );
    res.json({ token });
  } catch (error) {
    res.status(50);
    return;
  }
});

import express, { Request, Response } from 'express';
import User from '../models/User';
import { authMiddleware } from '../middleware';
import dbConnection from '../config/db';

export const userRouter = express.Router();

userRouter.get("/", authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    await dbConnection();
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ message: "email required" });
      return
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return
    }
    res.status(200).json(user);
    return
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    return
  }
});

userRouter.put("/update", authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    await dbConnection();
    const { name, email, bio, address, profilePicture } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      res.status(404).json({ message: "user not found" });
      return
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { name, bio, address, profilePicture },
      { new: true, runValidators: true }
    );

    res
      .status(200)
      .json({ message: "Profile updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    return
  }
});

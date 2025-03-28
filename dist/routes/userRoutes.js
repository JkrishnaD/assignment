"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const middleware_1 = require("../middleware");
const db_1 = __importDefault(require("../config/db"));
exports.userRouter = express_1.default.Router();
exports.userRouter.get("/", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.default)();
        const { email } = req.body;
        if (!email) {
            res.status(400).json({ message: "email required" });
            return;
        }
        const user = yield User_1.default.findOne({ email: req.body.email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
}));
exports.userRouter.put("/update", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.default)();
        const { name, email, bio, address, profilePicture } = req.body;
        const existingUser = yield User_1.default.findOne({ email });
        if (!existingUser) {
            res.status(404).json({ message: "user not found" });
            return;
        }
        const updatedUser = yield User_1.default.findOneAndUpdate({ email }, { name, bio, address, profilePicture }, { new: true, runValidators: true });
        res
            .status(200)
            .json({ message: "Profile updated", user: updatedUser });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
}));

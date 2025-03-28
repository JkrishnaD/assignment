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
exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, address, password, bio, profilePicture } = req.body;
        if (!name || !email || !address || !password) {
            res.status(400).json({ message: "Please fill all fields" });
            return;
        }
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = new User_1.default({
            name,
            email,
            address,
            password: hashedPassword,
            bio,
            profilePicture,
        });
        yield user.save();
        res.status(201).json({ message: "User registered successfully" });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Please fill all fields" });
            return;
        }
        const existingUser = yield User_1.default.findOne({ email });
        if (!existingUser) {
            res.status(400).json({ message: "Invalid Credentials" });
            return;
        }
        const verifyPassword = yield bcryptjs_1.default.compare(password, existingUser.password);
        if (!verifyPassword) {
            res.status(400).json({ message: "Incorrect Password" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: existingUser._id }, process.env.JWT_SECRET);
        res.json({ token });
    }
    catch (error) {
        res.status(50);
        return;
    }
});
exports.login = login;

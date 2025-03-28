"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const secret = process.env.JWT_SECRET;
    try {
        const decode = jsonwebtoken_1.default.verify(token, secret);
        req.body.user = decode;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid token" });
        return;
    }
};
exports.authMiddleware = authMiddleware;

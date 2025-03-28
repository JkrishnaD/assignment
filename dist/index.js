"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoute_1 = require("./routes/authRoute");
const userRoutes_1 = require("./routes/userRoutes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/*', (0, cors_1.default)());
app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
});
app.use("/app/v1", authRoute_1.authRouter);
app.use("/app/user", userRoutes_1.userRouter);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

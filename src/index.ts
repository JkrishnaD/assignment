import express from "express";
import cors from "cors";
import { authRouter } from "./routes/authRoute";
import { userRouter } from "./routes/userRoutes";

const app = express();

app.use(express.json());
app.use('/*',cors());

app.get("/",(req, res) => {
  res.json({ message: "Hello World" });
})

app.use("/app/v1",authRouter)
app.use("/app/user",userRouter)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

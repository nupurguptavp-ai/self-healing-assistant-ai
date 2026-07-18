import express from "express";
import userRouter from "./routes/user.route.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.json({
    message: "AI Self-Healing Demo Backend",
  });
});

app.use("/users", userRouter);
app.use(errorHandler);

export default app;
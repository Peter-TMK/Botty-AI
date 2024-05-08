import express from "express";
import dotenv from "dotenv";

import authRouter from "./routes/auth.routes.js";
import connectDB from "./confg/db.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/auth", authRouter);

// app.get("/", (req, res) => {
//   res.send(`Hey Botty! Running on http://localhost:${PORT}`);
// });

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
});

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./Config/db.js";
import Router from "./Router/index.js";

// ==========Congfigs=========
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

connectDb();
// =========End Configs ======
app.use("/api", Router);
app.listen(process.env.PORT, () => {
  console.log("server Running on " + process.env.PORT);
});

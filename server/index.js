import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./Config/db.js";
import Router from "./Router/index.js";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import { transactionMiddleware } from "./MiddleWare/utils.js";
// ==========Configs=========
const app = express();
dotenv.config();
const allowedOrigins = [
  "http://localhost:5173",
  'https://eclectic-naiad-a88864.netlify.app'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {  
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(transactionMiddleware);
connectDb();
// =========End Configs ======
app.use("/api", Router);
app.use(async (err, req, res, next) => {
  console.error(err);
  const errStatus = err.status || 500;
  const errMsg = err.message || "Something went wrong";
  
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
  });
});
app.listen(process.env.PORT, () => {
  console.log("server Running on " + process.env.PORT);
});

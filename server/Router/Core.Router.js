import express from "express";
import { generateSequence, getUnits } from "../Controller/CoreController.js";
import { Validate } from "../MiddleWare/Validation.js";
import { genSequenceValidation } from "../Validations/CoreValidation.js";
const router = express.Router();
router.get("/units", getUnits);
router.post(
  "/generate-sequence",
  Validate(genSequenceValidation),
  generateSequence
);
export const CoreRouter = router;

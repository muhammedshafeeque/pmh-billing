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
router.post("upi-configurations");
router.get("upi-configuration/:id");
router.get("upi-configurations");
router.patch("upi-configuration/:id");

export const CoreRouter = router;

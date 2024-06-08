import express from "express";
import {
  createCustomer,
  createVendor,
  getVendors,
} from "../Controller/EntityController.js";
import { Validate } from "../MiddleWare/Validation.js";
import {
  customerValidation,
  vendorValidation,
} from "../Validations/EntityValidations.js";
const router = express.Router();
router.post("/vendor", Validate(vendorValidation), createVendor);
router.get("/vendor", getVendors);
router.post("/customer", Validate(customerValidation), createCustomer);
export const EntityRouter = router;

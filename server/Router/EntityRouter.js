import express from "express";
import {
  createCustomer,
  createNewCustomerFromInvoice,
  createVendor,
  getCustomers,
  getVendors,
} from "../Controller/EntityController.js";
import { Validate } from "../MiddleWare/Validation.js";
import {
  createCustomerFromInvoice,
  customerValidation,
  vendorValidation,
} from "../Validations/EntityValidations.js";
const router = express.Router();
router.post("/vendor", Validate(vendorValidation), createVendor);
router.get("/vendor", getVendors);
router.post("/customer", Validate(customerValidation), createCustomer);
router.get('/customer',getCustomers)
router.post("/create-customer-from-invoice",Validate(createCustomerFromInvoice),createNewCustomerFromInvoice)
export const EntityRouter = router;

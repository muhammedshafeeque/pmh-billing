import express from "express";
import {
  createCustomer,
  createNewCustomerFromInvoice,
  createVendor,
  getCustomers,
  getVendors,
  updateVendor,
  deleteVendor,
  retrieveCustomer,
  uploadBulkCustomers,
  deleteCustomer,
  updateCustomer,
  customerExcelSampleFile,
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
router.post("/bulk-upload-customer",uploadBulkCustomers)
router.get('/customer',getCustomers)
router.get('/customer/:id',retrieveCustomer)
router.post("/create-customer-from-invoice",Validate(createCustomerFromInvoice),createNewCustomerFromInvoice)
router.delete('/customer/:id',deleteCustomer)
router.patch('/customer/:id',updateCustomer)
router.get("/customer-excel-sample-file", customerExcelSampleFile);
router.patch("/vendor/:id", Validate(vendorValidation), updateVendor);
router.delete("/vendor/:id", deleteVendor);
export const EntityRouter = router;

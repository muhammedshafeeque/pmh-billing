import express from "express";
import { createAccount, generateInvoice, getAccount, getAccountHeads, getPaymentList, getTransactions, processCollection } from "../Controller/AccountsController.js";
import { Validate } from "../MiddleWare/Validation.js";
import { AccountValidation, collectionValidation, invoiceValidation } from "../Validations/AccountValidation.js";
const router = express.Router();
router.get("/account-heads", getAccountHeads);
router.post('/account',Validate(AccountValidation),createAccount)
router.get('/account',getAccount)
router.get('/transaction',getTransactions)
router.get('/payments',getPaymentList)
router.post('/generate-invoice',Validate(invoiceValidation),generateInvoice)
router.post('/collection',Validate(collectionValidation),processCollection)
router.post('/process-payment')
export const accountsRouter = router;

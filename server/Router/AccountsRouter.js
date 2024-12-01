import express from "express";
import { createAccount, generateInvoice, getAccount, getAccountHeads, getCollections, getInvoices, getPaymentList, getTransactions, processCollection } from "../Controller/AccountsController.js";
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
router.get('/collection',getCollections)
router.get('/bill')
router.get('/bill/:id')
router.get('/invoice',getInvoices)
router.get('/invoice/:id')

export const accountsRouter = router;

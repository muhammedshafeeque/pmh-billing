import express from "express";
import { createAccount, generateInvoice, getAccount, getAccountHeads, getBillById, getBills, getCollections, getInvoiceById, getInvoices, getPaymentList, getTransactions, processCollection } from "../Controller/AccountsController.js";
import { Validate } from "../MiddleWare/Validation.js";
import { AccountValidation, collectionValidation, invoiceValidation } from "../Validations/AccountValidation.js";
const router = express.Router();
router.get("/account-heads", getAccountHeads);
router.post('/account',Validate(AccountValidation),createAccount)
router.get('/account',getAccount)
router.patch('/account/:id')
router.get('/transaction',getTransactions)
router.get('/payments',getPaymentList)
router.post('/generate-invoice',Validate(invoiceValidation),generateInvoice)
router.post('/collection',Validate(collectionValidation),processCollection)
router.get('/collection',getCollections)
router.get('/bill',getBills)
router.get('/bill/:id',getBillById)
router.get('/invoice',getInvoices)
router.get('/invoice/:id',getInvoiceById)

export const accountsRouter = router;

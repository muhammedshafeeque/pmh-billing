import express from "express";
import { createAccount, getAccount, getAccountHeads, getPaymentList, getTransactions } from "../Controller/AccountsController.js";
import { Validate } from "../MiddleWare/Validation.js";
import { AccountValidation } from "../Validations/AccountValidation.js";
const router = express.Router();
router.get("/account-heads", getAccountHeads);
router.post('/account',Validate(AccountValidation),createAccount)
router.get('/account',getAccount)
router.get('/transaction',getTransactions)
router.get('/payments',getPaymentList)
export const accountsRouter = router;

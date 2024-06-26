import { ACCOUNT_HEAD } from "../Models/AccountHead.js";
import { ACCOUNT } from "../Models/AccountModal.js";
import { PAYMENT } from "../Models/PaymentModal.js";
import { TRANSACTION } from "../Models/TransactionModal.js";
import { createAccountHead } from "../Service/AccountsService.js";
import { queryGen } from "../Utils/utils.js";

export const getAccountHeads = async (req, res, next) => {
  try {
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let keywords = await queryGen(req.query);
    let results = await ACCOUNT_HEAD.find(keywords).limit(limit).skip(skip);
    let count = await ACCOUNT_HEAD.find(keywords).count();
    res.send({ results, count });
  } catch (error) {
    next(error);
  }
};

export const createAccount = async (req, res, next) => {
  try {
    let AccountHead = await createAccountHead({ name: req.body.name });
    await ACCOUNT.create({
      name: req.body.name,
      type: "main",
      accountHead: AccountHead._id,
    });
    res.send({ message: "Account Created Successfully" });
  } catch (error) {
    next(error);
  }
};

export const getAccount = async (req,res,next) => {
  try {
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let keywords = await queryGen(req.query);
    let results = await ACCOUNT.find(keywords)
      .populate("accountHead")
      .limit(limit)
      .skip(skip);
    let count = await ACCOUNT.find(keywords).count();
    results = results.map((result) => ({
      ...result.toObject(),
      accountBallance: result.accountHead.accountBalance,
      accountHEad:result.accountHead.name
    }));
    res.send({ results, count });
  } catch (error) {
    next(error);
  }
};
export const getTransactions=async(req,res,next)=>{
  try {
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let keywords = await queryGen(req.query);
    let results = await TRANSACTION.find(keywords)
      .populate('fromAccount')
      .populate('toAccount')
      
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
    let count = await TRANSACTION.find(keywords).count();
    results = results.map((result) => ({
      ...result.toObject(),
      // fromAccount:result.fromAccount.name,
      // toAccount:result.toAccount.name

    }));
    res.send({ results, count });
  } catch (error) {
    next(error);
  }
}
export const getPaymentList=async(req,res,next)=>{
  try {
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let keywords = await queryGen(req.query);
    let results = await PAYMENT.find(keywords)
      .populate('fromAccount')
      .populate('paymentTo')
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
    let count = await PAYMENT.find(keywords).count();
    results = results.map((result) => ({
      ...result.toObject(),
      // fromAccount:result.fromAccount.name,
      // toAccount:result.toAccount.name

    }));
    res.send({ results, count });
  } catch (error) {
    next(error);
  }
}

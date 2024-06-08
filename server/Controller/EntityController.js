import { CUSTOMER } from "../Models/CustomerModal.js";
import { VENDOR } from "../Models/VendorModal.js";
import { createAccountHead } from "../Service/AccountsService.js";
import { queryGen } from "../Utils/utils.js";

export const createVendor = async (req, res, next) => {
  try {
    req.body.accountHEad = await createAccountHead({
      name: req.body.name,
      credit: Number(req.body.OpeningBalance),
      type: "payable",
    });
    await VENDOR.create(req.body);
    res.send({ message: "Vendor Created Successfully" });
  } catch (error) {
    next(error);
  }
};
export const createCustomer = async (req, res, next) => {
  try {
    req.body.accountHEad = await createAccountHead({
      name: req.body.name,
      debit: Number(req.body.OpeningBalance),
      type: "receivable",
    });
    await CUSTOMER.create(req.body);
    res.send({ message: "Customer  Created Successfully" });
  } catch (error) {
    next(error);
  }
};

export const getVendors = async (req, res, next) => {
  try {
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let keywords = await queryGen(req.query);
    let results = await VENDOR.find(keywords)
      .populate("accountHEad")
      .limit(limit)
      .skip(skip);
    let count = await VENDOR.find(keywords).count();
    results = results.map((result) => ({
      ...result.toObject(),
      accountBallance: result.accountHEad.accountBalance,
      accountHEad: result.accountHEad.name,
    }));
    res.send({ results, count });
  } catch (error) {
    next(error);
  }
};

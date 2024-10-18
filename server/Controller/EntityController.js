import { CUSTOMER } from "../Models/CustomerModal.js";
import { VENDOR } from "../Models/VendorModal.js";
import { createAccountHead, deleteAccountHead } from "../Service/AccountsService.js";
import { queryGen } from "../Utils/utils.js";

export const createVendor = async (req, res, next) => {
  let createdAccountHead = null;
  try {
    createdAccountHead = await createAccountHead({
      name: req.body.name,
      credit: Number(req.body.accountBallance),
      type: "payable",
    });
    req.body.accountHEad = createdAccountHead._id;
    const createdVendor = await VENDOR.create(req.body);
    res.status(201).send({ message: "Vendor Created Successfully", vendor: createdVendor });
  } catch (error) {
    if (createdAccountHead) {
      try {
        await deleteAccountHead(createdAccountHead._id);
      } catch (deleteError) {
        console.error("Error deleting account head:", deleteError);
      }
    }
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

export const getCustomers = async (req, res, next) => {
  try {
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let keywords = await queryGen(req.query);
    let customers = await CUSTOMER.find(keywords)
      .populate("accountHEad")
      .limit(limit)
      .skip(skip);
    let count = await CUSTOMER.find(keywords).count();
    res.send({ count, results: customers });
  } catch (error) {
    next(error);
  }
};

export const vcfFileCustomersBulkUpload = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const createNewCustomerFromInvoice = async (req, res, next) => {
  try {
    let  custExist=await CUSTOMER.findOne({phone:req.body.phone})
    if(custExist){
      next({status:400,message:'Customer Already Exist in same number'})
    }else{
      let accountHEad = await createAccountHead({
        name: req.body.firstName,
        debit: 0,
        type: "receivable",
      });
      let customer = {
        firstName: req.body.firstName,
        accountHEad: accountHEad._id,
       
        address: req.body.address,
        phone: req.body.phone,
        lastName: "s",
      };
      await CUSTOMER.create(customer);
      res.send({ message: "new customer Added", response: CUSTOMER });
    }
    
  } catch (error) {
    next(error);
  }
};

export const updateVendor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedVendor = await VENDOR.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json(updatedVendor);
  } catch (error) {
    next(error);
  }
};

export const deleteVendor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedVendor = await VENDOR.findByIdAndDelete(id);

    if (!deletedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json({ message: "Vendor deleted successfully" });
  } catch (error) {
    next(error);
  }
};

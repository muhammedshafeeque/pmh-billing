import { ACCOUNT_HEAD } from "../Models/AccountHead.js";
import { ACCOUNT } from "../Models/AccountModal.js";
import { COLLECTION } from "../Models/collectionModal.js";
import { CUSTOMER } from "../Models/CustomerModal.js";
import { INVOICE } from "../Models/InvoiceModal.js";
import { ITEM } from "../Models/itemModal.js";
import { PAYMENT } from "../Models/PaymentModal.js";
import { PREFIX_NUMBER_MODAL } from "../Models/PrefixNumber.js";
import { Stock } from "../Models/StockModal.js";
import { TRANSACTION } from "../Models/TransactionModal.js";
import {
  createAccountHead,
  createTransaction,
} from "../Service/AccountsService.js";
import {
  convertToBaseUnit,
  numberGenerator,
  queryGen,
} from "../Utils/utils.js";

export const getAccountHeads = async (req, res, next) => {
  try {
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let keywords = await queryGen(req.query);
    let results = await ACCOUNT_HEAD.find(keywords)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
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

export const getAccount = async (req, res, next) => {
  try {
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let keywords = await queryGen(req.query);
    let results = await ACCOUNT.find(keywords)
      .populate("accountHead")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
    let count = await ACCOUNT.find(keywords).count();
    results = results.map((result) => ({
      ...result.toObject(),
      accountBallance: result.accountHead.accountBalance,
      accountHEad: result.accountHead.name,
    }));
    res.send({ results, count });
  } catch (error) {
    next(error);
  }
};
export const getTransactions = async (req, res, next) => {
  try {
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let keywords = await queryGen(req.query);
    let results = await TRANSACTION.find(keywords)
      .populate("fromAccount")
      .populate("toAccount")

      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });
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
};
export const getPaymentList = async (req, res, next) => {
  try {
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let keywords = await queryGen(req.query);
    let results = await PAYMENT.find(keywords)
      .populate("fromAccount")
      .populate("paymentTo")
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });
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
};
export const generateInvoice = async (req, res, next) => {
  let data = req.body;
  try {
    let customer = await CUSTOMER.findById(data.customer);
    let itemIds = [];
    data.items.forEach((element) => {
      itemIds.push(element.item);
    });
    let stocks = await Stock.find({ item: { $in: itemIds } }).populate(
      "purchasedUnit"
    );
    let stocksMap = new Map(
      stocks.map((stock) => [stock._id.toString(), stock])
    );
    let items = await ITEM.find({ _id: { $in: itemIds } }).populate("unit");
    let itemsMap = new Map(items.map((item) => [item._id.toString(), item]));
    let invoice = {
      customer: customer._id,
      number: data.invoiceNumber,
      items: [],
      payableAmount: 0,
      discount: data.discount,
    };
    for (let i = 0; i < data.items.length; i++) {
      let item = data.items[i];
      let stock = stocksMap.get(item.stock);
      let Item = itemsMap.get(item.item);
      let quantity = convertToBaseUnit(item.quantity, Item.unit);
      let invoiceItem = {
        stock: stock._id,
        item: Item._id,
        quantity,
        total: quantity * stock.sellablePricePerUnit,
        pricePerUnit: stock.sellablePricePerUnit,
      };
      invoice.payableAmount = invoice.payableAmount + invoiceItem.total;
      await Stock.findByIdAndUpdate(stock._id, {
        $inc: { quantity: -quantity },
      });
      await ITEM.findByIdAndUpdate(item.stock, {
        $in: { totalStock: -quantity },
      });
      let transaction = await createTransaction({
        fromAccount: Item.accountHead,
        toAccount: customer.accountHEad,
        amount: invoiceItem.total,
        description: "Item Sales",
      });
      invoiceItem.transaction = transaction._id;
      invoice.items.push(invoiceItem);
    }
    invoice.invoiceAmount = invoice.payableAmount;
    invoice.payableAmount = invoice.invoiceAmount - data.discount;
    let INV = await INVOICE.create(invoice);
    const itemList = invoice.items.map((obj) => ({
      item: obj.item,
      itemName: itemsMap.get(String(obj.item)).name,
      quantity: obj.quantity,
      price: obj.pricePerUnit,
      total: obj.pricePerUnit * obj.quantity,
      unit: itemsMap.get(String(obj.item)).unit.unitCode,
    }));
    let response = {
      items: itemList,
      invoiceNumber: INV.number,
      customerName: customer.firstName,
      customerMobile: customer.phone,
      invoiceAmount: INV.invoiceAmount,
      payableAmount: INV.payableAmount,
      discount: INV.discount,
      date: INV.invoiceDate,
    };
    res
      .status(201)
      .send({ message: "invoice generated Successfully", response });
  } catch (error) {
    next(error);
  }
};
export const processCollection = async (req, res, next) => {
  try {
    let accounts = await ACCOUNT.find();
    let account = accounts[0];
    let customer = await CUSTOMER.findById(req.body.customerId);
    let transaction = await createTransaction({
      fromAccount: customer.accountHEad,
      toAccount: account.accountHead,
      amount: req.body.amount,
      description: `Collection From ${customer.firstName}`,
    });
    let count = await PREFIX_NUMBER_MODAL.find({ type: "/PAYMENT/" }).count();
    let number = await numberGenerator(count + 1, "/PAYMENT/");
    let Payment = await COLLECTION.create({
      collectedFrom: customer._id,
      toAccount: account.accountHead,
      amount: req.body.amount,
      transaction: transaction._id,
      number: number.name,
    });
    res.send({
      message: `Collection Recorded successfully , ID= ${number.name}`,
      Payment,
    });
  } catch (error) {
    next(error);
  }
};
export const getCollections = async (req, res, next) => {
  try {
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let keywords = await queryGen(req.query);
    let collections = await COLLECTION.find(keywords)
      .populate("collectedFrom")
      .skip(skip)
      .limit(limit);
    let count = await COLLECTION.find(keywords);
    res.send({ results: collections, count });
  } catch (error) {
    next(error);
  }
};
export const getInvoices = async (req, res, next) => {
  try {
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let keywords = await queryGen(req.query);
    let invoices = await INVOICE.find(keywords)
      .populate("customer")
      .populate("items.item")
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });
    let count=await INVOICE.find(keywords).count()
    const results = invoices.map((obj) => ({
      ...obj.toObject(),
      customerName:obj.customer.firstName,
      customer:obj.customer._id,
      customerPhone:obj.customer.phone
    }));
    res.send({results,count})
  } catch (error) {
    next(error);
  }
};

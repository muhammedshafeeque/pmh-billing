import { ACCOUNT_HEAD } from "../Models/AccountHead.js";
import { BILL } from "../Models/BillModal.js";
import { PAYMENT } from "../Models/PaymentModal.js";
import { TRANSACTION } from "../Models/TransactionModal.js";

export const createAccountHead = async (data) => {
  try {
    let accountHead = await ACCOUNT_HEAD.create(data);
    return Promise.resolve(accountHead);
  } catch (error) {
    return Promise.reject(error);
  }
};
export const createTransaction = async (data) => {
  try {
    let transaction = await TRANSACTION.create(data);
    
    // Update the debit and credit fields for the respective accounts
    await Promise.all([
      ACCOUNT_HEAD.findByIdAndUpdate(data.fromAccount, {
        $inc: { debit: data.amount },
      }),
      ACCOUNT_HEAD.findByIdAndUpdate(data.toAccount, {
        $inc: { credit: data.amount },
      }),
    ]);
    
    // Retrieve and save the updated account documents
    const fromAccount = await ACCOUNT_HEAD.findById(data.fromAccount);
    const toAccount = await ACCOUNT_HEAD.findById(data.toAccount);
    await Promise.all([
      fromAccount.save(),
      toAccount.save()
    ]);

    return Promise.resolve(transaction);
  } catch (error) {
    return Promise.reject(error);
  }
};
export const transferDiscount=async(data)=>{
  try {
    data.type='Discount'
    let transaction = await TRANSACTION.create(data);
    await Promise.all([
      ACCOUNT_HEAD.findByIdAndUpdate(data.toAccount, {
        $inc: { credit: data.amount },
      }),
    ]);
    const toAccount = await ACCOUNT_HEAD.findById(data.toAccount);
    await toAccount.save();
    return Promise.resolve(transaction);
  } catch (error) {
    return Promise.reject(error);
  }
}

export const addBill = async (data) => {
  try {
    let bill = {
      number: data.billNumber,
      vendor: data.vendor,
      billDate: data.billDate,
      items: [],
      billAmount: data.billAmount,
      payableAmount: data.payableAmount,
    };
    for (item of data.items) {
      bill.items.push({
        item: item.item,
        quantity: item.quantity,
        prise: item.purchaseRate,
      });
    }

    let Bill = await BILL.create(bill);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createPayment = async (data) => {
  
  try {
    let transaction = await createTransaction({
      fromAccount: data.fromAccount,
      toAccount: data.vendor.accountHEad._id,
      amount: data.amount,
      description: "Payment",
    });
    let payment = await PAYMENT.create({
      fromAccount: data.fromAccount,
      paymentTo: data.vendor._id,
      amount: data.amount,
      transaction: transaction._id,
    }); 
    return Promise.resolve(payment);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteAccountHead = async (accountHeadId) => {
  try {
    await ACCOUNT_HEAD.findByIdAndDelete(accountHeadId);
  } catch (error) {
    console.error("Error deleting account head:", error);
    throw error;
  }
};

import mongoose from "mongoose";

export const transactionMiddleware = async (req, res, next) => {
  req.session = await mongoose.startSession();
  req.session.startTransaction();

  try {
    await next();
    await req.session.commitTransaction();
  } catch (error) {
    await req.session.abortTransaction();
    next(error); 
  } finally {
    req.session.endSession(); 
  }
};

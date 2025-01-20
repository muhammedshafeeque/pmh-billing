import mongoose from "mongoose";

export const transactionMiddleware = async (req, res, next) => {
  if (req.method === "GET") {
    return next();
  }
  const dbSession = await mongoose.startSession();
  dbSession.startTransaction();

  try {
    req.dbSession = dbSession; // Attach session to the request
    await next(); // Proceed with the next middleware or route handler
    await dbSession.commitTransaction(); // Commit the transaction
  } catch (error) {
    await dbSession.abortTransaction(); // Abort the transaction on error
    next(error); // Forward the error to the error-handling middleware
  } finally {
    dbSession.endSession(); // Ensure session is always closed
  }
};

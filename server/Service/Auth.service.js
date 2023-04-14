import { db } from "../Config/db.js";
import { collections } from "../Constants/collections.js";

export const getUserByUserId = (userName) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db()
        .collection(collections.USER_COLLECTION)
        .findOne({userName:userName});
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};
export const createUser = (user) => {
  return new Promise(async (resolve, reject) => {
      try {
        let User = await db()
          .collection(collections.USER_COLLECTION)
          .insertOne(user);
        resolve(User);
      } catch (error) {
        reject(error);
      }
    })
};

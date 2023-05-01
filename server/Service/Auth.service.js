import { User } from "../Models/userModa.js";

export const getUserByUserId = (userName) => {
  return new Promise(async (resolve, reject) => {
    let user =await User.findOne({userName:userName})
    resolve (user)
  });
};
export const createUser = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      let usrData=await User.create(user)
      resolve(usrData)
    } catch (error) {
      reject(error);
    }
  });
};

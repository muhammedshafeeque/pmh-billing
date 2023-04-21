import { ObjectId } from "mongodb";
import { db } from "../Config/db.js";
import { collections } from "../Constants/collections.js";

export const getProfile = (query) => {
  return new Promise(async (resolve, reject) => {
    try {
     
      let keywords = {};


      let profiles = await db()
        .collection(collections.PROFIL_COLLECTION)
        .find(keywords)
        .toArray();

      resolve(profiles);
    } catch (error) {
      reject(error);
    }
  });
};
export const createProfile = (profile) => {
  return new Promise(async (resolve, reject) => {
    let user = await db()
      .collection(collections.PROFIL_COLLECTION)
      .insertOne(profile);
    resolve(user);
  });
};
export const getProfileByUserId = (id) => {

  return new Promise(async (resolve, reject) => {
    let user = await db()
      .collection(collections.PROFIL_COLLECTION)
      .findOne({ userId: ObjectId(id) });
    resolve(user);
  });
};

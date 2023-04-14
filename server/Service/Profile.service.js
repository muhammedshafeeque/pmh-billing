import { db } from "../Config/db.js";
import { collections } from "../Constants/collections.js";

export const getProfile = (query) => {
  return new Promise(async (resolve, reject) => {
    try {
     
      let keywords = {};
      query.msrNumber && (keywords.msrNumber = query.msrNumber);
      query.mobile && (keywords.mobile = query.mobile);
      query.email && (keywords.email = query.email);
      query.cluster && (keywords.cluster = query.cluster);
      query.mahallu && (keywords.mahallu = query.mahallu);
      query.skunit && (keywords.skunit = query.skunit);

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
      .findOne({ userId: id });
    resolve(user);
  });
};

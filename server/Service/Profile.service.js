import { ObjectId } from "mongodb";
import { Profile } from "../Models/profileModal.js";

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
    let user = await Profile.create(profile);
    resolve(user);
  });
};
export const getProfileByUserId = (id) => {
  return new Promise(async (resolve, reject) => {
    let user = await Profile.findOne({ userId: ObjectId(id) });
    resolve(user);
  });
};

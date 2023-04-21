import { db } from "../Config/db.js";
import { collections } from "../Constants/collections.js";

export const getRacks = (query) => {
  return new Promise(async (resolve, reject) => {
    let keywords = {};
    query.code&&(keywords.code=query.code)
    query.name&&(keywords.name=query.name)
    // query.query &&
    //   (keyword = {
    //     $or: [
    //       { name: { $regex: query.query, $options: "i" } },
    //       { code: { $regex: query.query, $options: "i" } },
    //     ],
    //   });
    let racks = await db()
      .collection(collections.RACK_COLLLECTIONS)
      .find(keywords)
      .limit(query.limit ? parseInt(query.limit) : 10)
      .skip(query.offset ? parseInt(query.offset) : 0)
      .toArray();
    resolve(racks);
  });
};

export const getSections = (query) => {
    return new Promise(async (resolve, reject) => {
      let keywords = {};
      query.query &&
        (keyword = {
          $or: [
            { code: { $regex: query.query, $options: "i" } },
          ],
        });
      let racks = await db()
        .collection(collections.SECTION_COLLECTION)
        .find(keywords)
        .limit(query.limit ? parseInt(query.limit) : 10)
        .skip(query.offset ? parseInt(query.offset) : 0)
        .toArray();
      resolve(racks);
    });
  };

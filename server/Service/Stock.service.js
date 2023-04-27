export const postRack = async (data) => {
  await db().collection(collections.RACK_COLLLECTIONS).insertOne(data);
  return;
};
export const getRacks = (query) => {
  return new Promise(async (resolve, reject) => {
    let keywords = {};
    query.code && (keywords.code = query.code);
    query.name && (keywords.name = query.name);
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
      (keywords = {
        $or: [{ code: { $regex: query.query, $options: "i" } }],
        $or: [{ name: { $regex: query.query, $options: "i" } }],
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
export const postSection = async (data) => {
  await db().collection(collections.SECTION_COLLECTION).insertOne(data);
  return;
};

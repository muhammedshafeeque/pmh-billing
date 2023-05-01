import { Rack } from "../Models/rack.modal.js";

export const postRack = async (data) => {
  await Rack.create(data);
  return;
};
export const getRacks = (query) => {
  return new Promise(async (resolve, reject) => {
    let keywords = {};
    query.code && (keywords.code = query.code);
    query.name && (keywords.name = query.name);
    let racks = await Rack.find(keywords)
      .populate("section")
      .limit(query.limit ? parseInt(query.limit) : 10)
      .skip(query.offset ? parseInt(query.offset) : 0);
    resolve(racks);
  });
};

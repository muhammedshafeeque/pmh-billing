import { Section } from "../Models/sectionModal.js";
import { queryGen } from "../Utils/utils.js";
export const getSections = (query) => {
  return new Promise(async (resolve, reject) => {
    let skip=query.skip?parseInt(query.skip):0
    let limit=query.limit?parseInt(query.limit):10
    let keywords = await queryGen(query);
    let sections = await Section.find(keywords)
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order (newest first)
      .limit(limit)
      .skip(skip);
    let count = await Section.find(keywords).countDocuments();
    resolve({ results: sections, count });
  });
};
export const postSection = async (data) => {
  let result = await Section.create(data);
  return result;
};
export const patchSection = async (data, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let updated = await Section.findByIdAndUpdate(id, data);
      resolve(updated);
    } catch (error) {
      reject(error);
    }
  });
};
export const deleteSection = async (id) => {
  await Section.deleteOne({ _id: id });
  return "removed Success Fully";
};
export const getSectionById=(id)=>{
  return Section.findById(id)
}

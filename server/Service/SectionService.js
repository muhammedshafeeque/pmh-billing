import { Section } from "../Models/sectionModal.js";
import { queryGen } from "../Utils/utils.js";
export const getSections = (query) => {
  return new Promise(async (resolve, reject) => {
    let keywords = await queryGen(query)
    let sections = await Section.find(keywords)
      .limit(query.limit ? parseInt(query.limit) : 10)
      .skip(query.offset ? parseInt(query.offset) : 0);
      let count= await Section.find(keywords).count()
    resolve({results:sections,count});
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

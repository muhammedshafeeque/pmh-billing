import { Section } from "../Models/sectionModal.js";
export const getSections = (query) => {
  return new Promise(async (resolve, reject) => {
    let keywords = {};
    query.query &&
      (keywords = {
        $or: [{ code: { $regex: query.query, $options: "i" } }],
        $or: [{ name: { $regex: query.query, $options: "i" } }],
      });
    let racks = await Section
      .find(keywords)
      .limit(query.limit ? parseInt(query.limit) : 10)
      .skip(query.offset ? parseInt(query.offset) : 0)
    resolve(racks);
  });
};
export const postSection = async (data) => {
 let result= await Section.create(data)
  return result
};
export const patchSection=async (data,id)=>{
  return new Promise(async(resolve,reject)=>{
    try {
      let updated=await Section.findByIdAndUpdate(id,data)
      resolve(updated)
    } catch (error) {
      reject(error)
    }
  })
 

}
export const deleteSection=async(id)=>{
  await Section.deleteOne({_id:id})
  return 'removed Success Fully'
}

import { UNITS } from "../Models/UnitModal.js";
import { queryGen } from "../Utils/utils.js";

export const getUnits = async (req, res, next) => {
  try {
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let keywords = await queryGen(req.query);
    let units = await UNITS.find(keywords).limit(limit).skip(skip);
    let count = await UNITS.find(keywords).count();
    res.send({ count, results: units });
  } catch (error) {
    next(error);
  }
};
export const generateSequence=async(req,res,next)=>{
  try {
    
  } catch (error) {
    next(error);
  }
}
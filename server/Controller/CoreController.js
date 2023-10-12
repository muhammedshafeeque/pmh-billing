import { UNITS } from "../Models/UnitModal.js";

export const getUnits = async (req, res, next) => {
  try {
    let keywords = {};
    req.query.query &&
      (keywords = {
        $or: [
          { Symbol: { $regex: req.query.query, $options: "i" } },
          { Name: { $regex: req.query.query, $options: "i" } },
        ],
      });
    let units = await UNITS.find(keywords);
    res.send(units);
  } catch (error) {
    next(error);
  }
};

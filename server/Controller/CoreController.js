import { units } from "../Constants/Constants.js";

export const getUnits = (req, res) => {
  res.send(units);
};

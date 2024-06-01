import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { InvoiceNumber } from "invoice-number";
export const encryptString = async (password) => {
  let hash = await bcrypt.hashSync(password, 10);
  return hash;
};
export const comparePassword = async (password, hash) => {
  let status = await bcrypt.compare(password, hash);
  return status;
};
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
export const numberGenerator = async (count) => {
  return InvoiceNumber.next(`IMM0${count}`);
};
export const queryGen = async (query) => {
  delete query.skip;
  delete query.limit;
  let keywords = {};
  Object.keys(query).forEach((queryParam) => {
    if (query[queryParam]) {
      const field = getFieldFromQueryParam(queryParam);
      const regexSearch = new RegExp(query[queryParam], "i");

      if (field) {
        if (queryParam.endsWith("Contains")) {
          keywords.$or = keywords.$or || [];
          keywords.$or.push({ [field]: { $regex: regexSearch } });
        } else {
          keywords[field] = parseQueryParam(query[queryParam]);
        } 
      }
    }
  });
  return keywords;
};
export const getFieldFromQueryParam = (queryParam) => {
  return queryParam.endsWith("Contains") ? queryParam.slice(0, -8) : queryParam;
};

export const parseQueryParam = (value) => {
  if (!isNaN(value)) {
    return parseFloat(value);
  } else {
    return value;
  }
};
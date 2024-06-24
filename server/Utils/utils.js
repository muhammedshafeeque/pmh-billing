import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import xlsx from "xlsx";
import ExcelJS from "exceljs";
import { PREFIX_NUMBER_MODAL } from "../Models/PrefixNumber.js";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

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
export const numberGenerator = async (count, prefix) => {
  let sequence = await PREFIX_NUMBER_MODAL.create({
    name: `PMH${prefix}0${count}`,
    type: prefix,
  });
  return sequence;
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

export const uploadFile = (files) => {
  return new Promise((resolve, reject) => {
    if (!files || Object.keys(files).length === 0) {
      reject({ status: 400, message: "No files were uploaded" });
    }

    const uploadedFile = files.files;

    const uniqueFilename = uuidv4() + path.extname(uploadedFile.name);
    const uploadDir = path.join("./Public/uploads");
    const filePath = path.join(uploadDir, uniqueFilename);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    uploadedFile.mv(filePath, function (err) {
      if (err) {
        reject(err);
      }
      resolve({
        success: true,
        message: "File uploaded successfully",
        filename: path.join(uniqueFilename),
      });
    });
  });
};
export const ExcelDataExtractor = (file) => {
  try {
    const filePath = path.join("./Public/uploads", file.filename);
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);
    fs.unlink(filePath, (err) => {});
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const generateErrorExcelBlob = async (data) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Error Report");
    const headers = Object.keys(data[0].item);
    headers.push("success");
    headers.push("error");
    worksheet.addRow(headers);

    data.forEach((item) => {
      const rowValues = Object.values(item.item).concat([
        item.success,
        item.error ? item.error.message : "",
      ]);
      const row = worksheet.addRow(rowValues);
      if (!item.success) {
        row.eachCell((cell) => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFFF0000" },
          };
        });
      }
    });
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  } catch (error) {
    throw error;
  }
};
export const generateExcelBlob = async (data) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sample Sheet");
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Data must be a non-empty array.");
    }
    const columns = Object.keys(data[0]).map((key) => ({
      header: key,
      key: key,
    }));
    worksheet.columns = columns;
    data.forEach((item) => {
      worksheet.addRow(item);
    });
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  } catch (error) {
    throw error;
  }
};

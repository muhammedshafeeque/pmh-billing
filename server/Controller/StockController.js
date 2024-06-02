import {
  deleteSection,
  getSections,
  patchSection,
  postSection,
} from "../Service/SectionService.js";
import {
  postRack,
  getRacks,
  patchRack,
  deleteRack,
  getRackById,
  pushItemToRack,
  pullItemFromRack,
} from "../Service/RackService.js";
import {
  deleteItem,
  getItem,
  getItemById,
  getItemByIdFullPopulate,
  patchItem,
  postItem,
  pushStockToItem,
} from "../Service/itmeService.js";
import { patchStock, postStock } from "../Service/StockService.js";
import {
  CategoryCodeValidate,
  CategoryNameValidate,
} from "../Helper/StockHelpers.js";
import { Category } from "../Models/CategoryModal.js";
import {
  ExcelDataExtractor,
  generateErrorExcelBlob,
  queryGen,
  uploadFile,
} from "../Utils/utils.js";
import { Readable } from "stream";

export const createSection = async (req, res, next) => {
  try {
    await postSection(req.body);
    res.send("done");
  } catch (error) {
    next(error);
  }
};
export const getSectionList = async (req, res) => {
  try {
    let sections = await getSections(req.query);
    res.send(sections);
  } catch (error) {
    res.status(400).send("err" + error);
  }
};

export const updateSection = async (req, res) => {
  try {
    let update = await patchSection(req.body, req.params.id);
    res.send(update);
  } catch (error) {
    res.status(400).send("Err:" + error);
  }
};
export const removeSection = async (req, res) => {
  try {
    await deleteSection(req.params.id);
    res.send("Section Removed Successfully ");
  } catch (error) {
    res.status(400).send("Err:" + error);
  }
};
export const createRack = async (req, res) => {
  try {
    await postRack(req.body);
    res.send("done");
  } catch (error) {
    res.status(400).send("Err:" + error);
  }
};
export const getRackList = async (req, res) => {
  try {
    let racks = await getRacks(req.query);
    res.send(racks);
  } catch (error) {
    res.status(400).send("Err:" + error);
  }
};
export const updateRack = async (req, res) => {
  try {
    let rack = await patchRack(req.params.id, req.body);
    res.send(rack);
  } catch (error) {
    res.status(400).send("Err:" + error);
  }
};
export const RemoveRack = async (req, res) => {
  try {
    await deleteRack(req.params.id);
    res.send("Deleted Successfully");
  } catch (error) {
    res.status(400).send("Err:" + error);
  }
};
export const createItem = async (req, res, next) => {
  try {
    let item = await postItem(req.body);
    res.send(item);
  } catch (error) {
    next(error);
  }
};
export const updateItem = async (req, res, next) => {
  try {
    let existItem = await getItemById(req.params.id);
    existItem.activeracks.forEach((obj) => {
      pullItemFromRack(obj, req.params.id);
    });
    let item = await patchItem(req.params.id, req.body);
    req.body.activeracks.forEach((rack) => {
      pushItemToRack(rack, Item._id);
    });

    res.send(item);
  } catch (error) {
    next(error);
  }
};
export const removeItem = async (req, res, next) => {
  try {
    let item = await deleteItem(req.params.id);
    res.send(item);
  } catch (error) {
    next(error);
  }
};
export const getItemList = async (req, res, next) => {
  try {
    let items = await getItem(req.query);
    res.send(items);
  } catch (error) {
    next(error);
  }
};
export const getItemWithId = async (req, res, next) => {
  try {
    let item = await getItemByIdFullPopulate(req.params.id);
    res.send(item);
  } catch (error) {
    next(error);
  }
};
export const createStock = async (req, res, next) => {
  if (req.body) {
    try {
      let Item = await getItemById(req.body.item);
      if (Item) {
        let rack = await getRackById(req.body.rack);
        let itemExist = await rack.Item.find((str) => {
          return String(str) === req.body.item;
        });
        console.log(req.body);
        if (itemExist) {
          let Stock = req.body;
          Stock.quantity = Stock.purchasedQuantity;
          Stock.purchaseDate = new Date();
          let stock = await postStock(Stock);
          await patchRack(req.body.rack, { item: req.body.item });
          await pushStockToItem(stock, Item);
          res.send("Stock Added Successfully");
        } else {
          next({
            status: 400,
            message: "Rack Note Fount Or It is not Assigned to Given Item",
          });
        }
      } else {
        next({ status: 400, message: "Item Not Fount" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
};
export const addItemToRack = async (req, res, next) => {
  try {
    await pushItemToRack(req.params.id, req.body.item);
    res.send("Updated Successfully");
  } catch (error) {
    next(error);
  }
};
export const updateStock = async (req, res, next) => {
  try {
    await patchStock(req.params.id, req.body);
  } catch (error) {
    res.send(error);
  }
};
export const createCategory = async (req, res, next) => {
  try {
    let validations = [
      CategoryCodeValidate(req.body),
      CategoryNameValidate(req.body),
    ];
    await Promise.all(validations);

    await Category.create(req.body);
    res.send({ message: "Category Added Successfully" });
  } catch (error) {
    next(error);
  }
};
export const categoryBulkUpload = async (req, res, next) => {
  try {
    console.log("calling");
    const file = await uploadFile(req.files);
    const data = await ExcelDataExtractor(file);
    const results = await Promise.all(
      data.map(async (item) => {
        try {
          await CategoryCodeValidate(item);
          await CategoryNameValidate(item);
          return { item, success: true };
        } catch (error) {
          return { item, success: false, error };
        }
      })
    );
    const errorList = results.filter((obj) => !obj.success);

    if (errorList.length) {
      const buffer = await generateErrorExcelBlob(results);
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=error_report.xlsx"
      );
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.status(400).send({
        message: "Upload Failed! Please Check Error File",
        file: buffer,
      });
    } else {
      await Category.insertMany(data);
      res.send({ message: "Categories Uploaded Successfully" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let keywords = await queryGen(req.query);
    let results = await Category.find(keywords).limit(limit).skip(skip);
    let count = await Category.find(keywords).count();
    res.send({ results, count });
  } catch (error) {
    next(error);
  }
};

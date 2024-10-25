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
} from "../Service/itmeService.js";
import { patchStock, postStock } from "../Service/StockService.js";
import {
  CategoryCodeValidate,
  CategoryNameValidate,
} from "../Helper/StockHelpers.js";
import { Category } from "../Models/CategoryModal.js";
import {
  convertToBaseUnit,
  ExcelDataExtractor,
  generateErrorExcelBlob,
  generateExcelBlob,
  queryGen,
  uploadFile,
} from "../Utils/utils.js";
import {
  createPayment,
  transferDiscount,
} from "../Service/AccountsService.js";
import { VENDOR } from "../Models/VendorModal.js";
import { ACCOUNT } from "../Models/AccountModal.js";
import { BILL } from "../Models/BillModal.js";
import { Stock } from "../Models/StockModal.js";
import { collections } from "../Constants/collections.js";
import mongoose from "mongoose";
import { ITEM } from "../Models/itemModal.js";

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
export const removeSection = async (req, res, next) => {
  try {
    // Check if there are any racks associated with this section
    const relatedRacks = await getRacks({ section: req.params.id });

    if (relatedRacks.results.length > 0) {
      // If there are related racks, don't allow deletion
      return res.status(400).json({
        message: "Cannot delete section. There are racks associated with this section.",
        relatedRacksCount: relatedRacks.length
      });
    }else{
      // If no related racks, proceed with deletion
    await deleteSection(req.params.id);
    res.send("Section Removed Successfully");
    }

    
  } catch (error) {
    next(error);
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
  try {
    if(req.body.payedAmount>0){
      if(!req.body.account){
        throw {status:400,message:"Payment Account is required"}
      }
    }
    let accountKeywords={ name: "Store" }
    if(req.body.account){
      accountKeywords={_id:new mongoose.Types.ObjectId(req.body.account)}
    }
    
    const [vendor, account, bill] = await Promise.all([
      VENDOR.findById(req.body.vendor),
      ACCOUNT.findOne(accountKeywords).populate("accountHead"),
      BILL.create(req.body),
    ]);
  
    let Discount = req.body.billAmount - req.body.payableAmount;
    if (Discount > 0) {
      await transferDiscount({
        fromAccount: vendor.accountHEad._id,
        toAccount: account.accountHead._id,
        amount: Discount,
        description: "Purchase Bill",
      });
    }
    
    await Promise.all(
      req.body.items.map(async (stock) => {
        stock.vendor = vendor._id;
        stock.mainAccount = vendor.accountHEad;
        stock.bill = bill._id;
        await postStock(stock);
      })
    );
    if (req.body.payedAmount>0) {
      await createPayment({
        fromAccount: account.accountHead._id,
        vendor,
        amount: req.body.payedAmount,
      });
    }
    res.send("Stock Added Successfully");
  } catch (error) {
    next(error);
  }
};
export const getStocks = async (req, res, next) => {
  try {
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let keywords = await queryGen(req.query);
    let results = await Stock.find(keywords)
        .sort({ createdAt: -1 })
      .populate({
        path: "item",
        populate: [
          {
            path: "category",
            model: collections.CATEGORY_COLLECTIONS,
          },
        ],
      }).populate("purchasedUnit")
      .populate("vendor")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
    let count = await Stock.find(keywords).count();
    results = results.map((result) => ({
      ...result.toObject(),
      name: result.item.name,
      item: result.item._id,
      vendor: result.vendor.name,
      unit: result.purchasedUnit.unitName,
      code: result.item.code,
      category: result.item.category,
    }));
    res.send({ results, count });
  } catch (error) {
    next(error);
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
    res.send("Updated Successfully");
  } catch (error) {
    next(error);
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
    next(error);
  }
};

export const getCategorySampleFile = async (req, res, next) => {
  try {
    let data = [{ name: "sample", code: "SAM", description: "" }];
    const buffer = await generateExcelBlob(data);
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=error_report.xlsx"
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.status(200).send({
      file: buffer,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let keywords = await queryGen(req.query);
    let results = await Category.find(keywords).sort({ createdAt: -1 }).limit(limit).skip(skip);
    let count = await Category.find(keywords).count();
    res.send({ results, count });
  } catch (error) {
    next(error);
  }
};

export const getItemsForInvoice = async (req, res, next) => {
  try {
    let keywords = await queryGen({
      nameContains: req.query.query,
      codeContains: req.query.query
    });
    
    let items = await ITEM.find(keywords)
      .limit(10)
      .populate('unit')
      .populate('racks')
      .populate({
        path:'racks',
        populate: {
          path: "section",
          model: collections.SECTION_COLLECTION,
        },
      });

    const itemsWithStocks = await Promise.all(items.map(async (item) => {
      try {
        const stocks = await Stock.find({ 
          item: new mongoose.Types.ObjectId(item._id), 
          quantity: { $gt: 0 } 
        }).populate('purchasedUnit');
        return { item, stocks }; 
      } catch (error) {
        console.error(`Error fetching stocks for item ${item._id}:`, error);
        return { item, stocks: [] };
      }
    }));

    let itemList = [];
    
    itemsWithStocks.forEach((itemWithStock) => {
      if (itemWithStock.stocks.length) {
        itemWithStock.stocks.forEach((inv) => {
          if (inv.quantity > 0) {
            let inventory = {
              name: itemWithStock.item.name,
              code: itemWithStock.item.code,
              itemId:itemWithStock.item._id,
              stockId:inv._id,
              racks: itemWithStock.item.racks ? itemWithStock.item.racks.map((obj) => ({
                ...obj.toObject(),
                rackName: obj.name,
                rackCode: obj.code,
                section:obj.section.name,
                sectionCode:obj.section.code
              })) : [],
              stock: convertToBaseUnit(inv.quantity,inv.purchasedUnit),
              unit: itemWithStock.item.unit ? itemWithStock.item.unit.unitName : null,
              unitCode:itemWithStock.item.unit ? itemWithStock.item.unit.unitCode : null,
              unitId:itemWithStock.item.unit ? itemWithStock.item.unit._id: null,
              measurement:itemWithStock.item.unit ? itemWithStock.item.unit.measurement: null,
              price:inv.sellablePricePerUnit
            };
            itemList.push(inventory);
          }
        });
      }
    });

    res.send({results:itemList});
  } catch (error) {
    next(error);
  }
};

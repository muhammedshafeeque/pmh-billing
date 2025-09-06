import express from "express";
import {
  RemoveRack,
  addItemToRack,
  categoryBulkUpload,
  createCategory,
  createItem,
  createRack,
  createSection,
  createStock,
  deleteCategory,
  getCategories,
  getCategorySampleFile,
  getItemList,
  getItemWithId,
  getItemsForInvoice,
  getRackList,
  getSectionList,
  getStocks,
  removeItem,
  removeSection,
  updateCategory,
  updateItem,
  updateRack,
  updateSection,
  updateStock,
} from "../Controller/StockController.js";
import { Validate } from "../MiddleWare/Validation.js";
import {
  CateGoryValidation,
  RackValidation,
  SectionValidation,
  StockValidation,
  itemValidations,
  itemUpdateValidations,
  StockUpdateValidation,
} from "../Validations/Stock.Validations.js";

const router = express.Router();
router.post("/rack", Validate(RackValidation), createRack);
router.get("/rack", getRackList);
router.patch("/rack/:id", updateRack);
router.delete("/rack/:id", RemoveRack);
router.patch("/rack/add-item/:id", addItemToRack);
router.post("/section", Validate(SectionValidation), createSection);
router.get("/section", getSectionList);
router.patch("/section/:id", updateSection);
router.delete("/section/:id", removeSection);
router.post("/category",Validate(CateGoryValidation),createCategory);
router.post("/category-excel-upload",categoryBulkUpload)
router.get("/category-excel-sample-file",getCategorySampleFile)
router.get("/category",getCategories);
router.patch("/category/:id", Validate(CateGoryValidation), updateCategory);
router.delete("/category/:id", deleteCategory);
router.post("/item",Validate(itemValidations), createItem);
router.get("/item", getItemList);
router.patch("/item/:id", Validate(itemUpdateValidations), updateItem);
router.delete("/item/:id", removeItem);
router.get("/item/:id", getItemWithId);
router.post("/stock", Validate(StockValidation), createStock);
router.get("/stock",getStocks),
router.patch("/stock/:id",Validate(StockUpdateValidation),updateStock);
router.get('/invoice-item',getItemsForInvoice)

export default router;

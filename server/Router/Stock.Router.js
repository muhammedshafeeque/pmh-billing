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
  getCategories,
  getCategorySampleFile,
  getItemList,
  getItemWithId,
  getRackList,
  getSectionList,
  removeItem,
  removeSection,
  updateItem,
  updateRack,
  updateSection,
} from "../Controller/StockController.js";
import { Validate } from "../MiddleWare/Validation.js";
import {
  CateGoryValidation,
  RackValidation,
  SectionValidation,
  StockValidation,
  itemValidations,
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
router.patch("/category/:id");
router.delete("/category/:id");
router.post("/item",Validate(itemValidations), createItem);
router.get("/item", getItemList);
router.patch("/item", updateItem);
router.delete("/item/:id", removeItem);
router.get("/item/:id", getItemWithId);
router.post("/stock", Validate(StockValidation), createStock);
router.get("/stock"),
router.patch("/stock",);

export default router;

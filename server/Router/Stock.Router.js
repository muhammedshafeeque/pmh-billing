import express from "express";
import {
  RemoveRack,
  addItemToRack,
  createItem,
  createRack,
  createSection,
  createStock,
  getItemList,
  getRackList,
  getSectionList,
  removeSection,
  updateItem,
  updateRack,
  updateSection,
} from "../Controller/StockController.js";
import { Validate } from "../MiddleWare/Validation.js";
import {
  RackValidation,
  SectionValidation,
  StockValidation,
} from "../Validations/Stock.Validations.js";
import { deleteItem } from "../Service/itmeCotroller.js";
const router = express.Router();
router.post("/rack", Validate(RackValidation), createRack);
router.get("/rack", getRackList);
router.patch("/rack/:id", updateRack);
router.delete("/rack/:id", RemoveRack);
router.patch('/rack/add-item/:id',addItemToRack)
router.post("/section", Validate(SectionValidation), createSection);
router.get("/section", getSectionList);
router.patch("/section/:id", updateSection);
router.delete("/section/:id", removeSection);
// router.post('/groupe',)
// router.get('/groupe')
// router.patch('/groupe/:id',)
// router.delete('/groupe/:id',)
router.post("/category");
router.get("/category");
router.patch("/category/:id");
router.delete("/category/:id");
router.post("/item", createItem),
router.get("/item", getItemList),
router.patch("/item", updateItem);
router.delete("/item", deleteItem);
router.post("/stock",Validate(StockValidation),createStock),
router.patch("/stock");

export default router;

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
} from "../Service/RackService.js";
import {
  deleteItem,
  getItem,
  getItemById,
  patchItem,
  postItem,
  pushStockToItem,
} from "../Service/itmeCotroller.js";
import { postStock } from "../Service/StockService.js";
export const createSection = async (req, res) => {
  try {
    await postSection(req.body);
    res.send("done");
  } catch (error) {
    res.status(400).send("err" + error);
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
export const createItem = async (req, res,next) => {
  try {
    let item = await postItem(req.body);
    req.body.activeracks.forEach(element => {
      pushItemToRack(element,item._id)
    });
    res.send(item);
  } catch (error) {
    console.log(error)
    next(error)
  }
};
export const updateItem = async (req, res) => {
  try {
    let item = await patchItem(req.params.id, req.body);
    res.send(item);
  } catch (error) {
    res.status(400).send("Err:" + error);
  }
};
export const removeItem = async (req, res) => {
  try {
    let item = await deleteItem(req.params.id);
    res.send(item);
  } catch (error) {
    res.status(400).send("Err:" + error);
  }
};
export const getItemList = async (req, res, next) => {
  try {
    let itmes = await getItem(req.query);
    res.send(itmes);
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
        let itemExist = await rack.items.find((str) => {
          return String(str) === req.body.item;
        });

        if (itemExist) {
          let Stock = req.body;
          Stock.qouantity = Stock.purchasedQouantity;
          Stock.purchaseDate = new Date();
          let stock = await postStock(Stock);
          await patchRack(req.body.rack, { item: req.body.item });
          await pushStockToItem(stock,Item);
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

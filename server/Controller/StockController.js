import { getSections, postSection } from "../Service/SectionService.js";
import {postRack,getRacks} from '../Service/RackService.js'
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
export const createRack = async (req, res) => {
  try {
    await postRack(req.body);
    res.send("done");
  } catch (error) {
    res.status(400).send("err" + error);
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
 
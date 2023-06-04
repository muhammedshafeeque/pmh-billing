import express from 'express'
import { getUnits } from '../Controller/CoreController.js'
const router=express.Router()
router.get('/units',getUnits)
export const CoreRouter=router
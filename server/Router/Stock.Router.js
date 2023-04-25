import express from 'express'
import { createRack, createSection, getRackList, getSectionList } from '../Controller/StockController.js'
import { Validate } from '../MiddleWare/Validation.js'
import { RackValidation, SectionValidation } from '../Validations/Stock.Validations.js'
const router=express.Router()
router.post('/rack',Validate(RackValidation),createRack)
router.get('/rack',getRackList)
router.patch('/rack/:id',)
router.delete('/rack/:id',)
router.post('/section',Validate(SectionValidation),createSection)
router.get('/section',getSectionList)
router.patch('/section/:id',)
router.delete('/section/:id',)
router.post('/groupe',)
router.get('/groupe')
router.patch('/groupe/:id',)
router.delete('/groupe/:id',)
router.post('/category',)
router.get('/category')
router.patch('/category/:id',)
router.delete('/category/:id',)



export default router
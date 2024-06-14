import express from 'express'
import { getUnits } from '../Controller/CoreController.js'
import { Validate } from '../MiddleWare/Validation.js'
import { genSequenceValidation } from '../Validations/CoreValidation.js'
const router=express.Router()
router.get('/units',getUnits)
router.post('/generate-sequence',Validate(genSequenceValidation))
export const CoreRouter=router
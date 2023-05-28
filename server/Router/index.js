import express from 'express'
import AuthRouter from './auth.Router.js'
import StockRouter from './Stock.Router.js'
import { verifyUser } from '../MiddleWare/VerifyUser.js'
import { BillRouter } from './BuillRouter.js'
const router=express.Router()
router.use('/auth',AuthRouter)
router.use('/stock',verifyUser,StockRouter)
router.use('/bill',BillRouter)
export default router
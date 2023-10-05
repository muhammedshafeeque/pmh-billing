import express from 'express'
import AuthRouter from './auth.Router.js'
import StockRouter from './Stock.Router.js'
import { verifyUser } from '../MiddleWare/VerifyUser.js'
import { BillRouter } from './BillRouter.js'
import { CoreRouter } from './Core.Router.js'
const router=express.Router()
router.use('/auth',AuthRouter)
router.use('/stock',verifyUser,StockRouter)
router.use('/bill',verifyUser,BillRouter)
router.use('/core',verifyUser,CoreRouter)
export default router
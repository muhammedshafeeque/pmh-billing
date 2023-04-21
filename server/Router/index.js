import express from 'express'
import AuthRouter from './auth.Router.js'
import StockRouter from './Stock.Router.js'
import { verifyUser } from '../MiddleWare/VerifyUser.js'
const router=express.Router()
router.use('/auth',AuthRouter)
router.use('/stock',verifyUser,StockRouter)
export default router
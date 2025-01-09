import express from 'express'
import AuthRouter from './auth.Router.js'
import StockRouter from './Stock.Router.js'
import { verifyUser } from '../MiddleWare/VerifyUser.js'
import { CoreRouter } from './Core.Router.js'
import { EntityRouter } from './EntityRouter.js'
import { accountsRouter } from './AccountsRouter.js'
import { transactionMiddleware } from '../MiddleWare/utils.js'
const router=express.Router()
router.use('/auth',AuthRouter)
router.use('/stock',verifyUser,transactionMiddleware,StockRouter)
router.use('/accounts',verifyUser,transactionMiddleware,accountsRouter)
router.use('/core',verifyUser,transactionMiddleware,CoreRouter)
router.use('/entity',verifyUser,transactionMiddleware,EntityRouter)

export default router
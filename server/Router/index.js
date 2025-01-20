import express from 'express'
import AuthRouter from './auth.Router.js'
import StockRouter from './Stock.Router.js'
import { verifyUser } from '../MiddleWare/VerifyUser.js'
import { CoreRouter } from './Core.Router.js'
import { EntityRouter } from './EntityRouter.js'
import { accountsRouter } from './AccountsRouter.js'
const router=express.Router()
router.use('/auth',AuthRouter)
router.use('/stock',verifyUser,StockRouter)
router.use('/accounts',verifyUser,accountsRouter)
router.use('/core',verifyUser,CoreRouter)
router.use('/entity',verifyUser,EntityRouter)

export default router
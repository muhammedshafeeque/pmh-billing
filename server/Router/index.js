import express from 'express'
import AuthRouter from './auth.Router.js'
const router=express.Router()
router.use('/auth',AuthRouter)
export default router
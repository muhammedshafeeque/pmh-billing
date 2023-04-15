import express from 'express'
import { doLogin, getReqestUser, makeProfile } from '../Controller/AuthController.js'
import { Validate } from '../MiddleWare/Validation.js'
import {loginValidate, signup, } from '../Validations/Auth.validation.js'
import { verifyUser } from '../MiddleWare/VerifyUser.js'
const router=express.Router()
router.post('/signup',Validate(signup),makeProfile)
router.post('/login',Validate(loginValidate),doLogin)
router.get('/get-req-user',verifyUser,getReqestUser)
export default router
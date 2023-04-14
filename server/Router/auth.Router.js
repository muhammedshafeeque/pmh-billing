import express from 'express'
import { doLogin, makeProfile } from '../Controller/AuthController.js'
import { Validate } from '../MiddleWare/Validation.js'
import {loginValidate, signup, } from '../Validations/Auth.validation.js'
const router=express.Router()
router.post('/signup',Validate(signup),makeProfile)
router.post('/login',Validate(loginValidate),doLogin)
export default router
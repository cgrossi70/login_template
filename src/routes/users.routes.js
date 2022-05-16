import { Router } from 'express'
import { renderSignupForm, renderSigninForm, signin, signup, logout } from '../controllers/users.controller'

const router = Router()

router.get('/users/signup', renderSignupForm)
router.get('/users/signin', renderSigninForm)

router.post('/users/signin', signin)
router.post('/users/signup', signup)

router.get('/users/logout', logout)


export default router
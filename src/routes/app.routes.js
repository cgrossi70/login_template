import { Router } from 'express'
import {appInit} from '../controllers/app.controller'
import {isAuthenticated} from '../helpers/auth'

const router = Router()

router.get('/app', isAuthenticated, appInit)

export default router
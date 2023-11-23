import { Router } from "express";
import authController from "../controllers/auth.controller";
const router = Router()
const authorize = authController
router.post('/sign',authorize.Login)
export default router
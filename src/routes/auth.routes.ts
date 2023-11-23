import { Router } from "express"
import AuthController from "../controllers/auth.controller"

const router = Router()
const product = AuthController

router.post("/", product.loginUser)

export default router
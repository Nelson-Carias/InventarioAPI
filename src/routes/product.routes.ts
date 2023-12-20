import {} from 'express'
import { Router } from "express"
import ProductController from "../controllers/product.controller"
import { checkToken } from '../jwtvalidation/jwt.validation';

const router = Router()
const product = ProductController

router.post("/",  checkToken,   product.createProduct)
router.get("/",  checkToken,   product.getProducts)
router.get("/:id", checkToken,   product.byIdProduct)
router.delete("/:id",  checkToken,  product.deleteProduct)
router.put("/:id", checkToken,  product.updateProduct)

export default router
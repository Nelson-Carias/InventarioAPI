import { Router } from "express"
import CustomerController from "../controllers/customer.controller"
import { checkToken } from '../jwtvalidation/jwt.validation'

const router = Router()
const product = CustomerController


router.post("/",  checkToken,  product.createCustomer)
router.get("/",   checkToken, product.getCustomers)
router.get("/:id", checkToken,  product.byIdCustomer)
router.delete("/:id", checkToken,    product.deleteCustomer)
router.put("/:id",  checkToken,  product.updateCustomer)

export default router
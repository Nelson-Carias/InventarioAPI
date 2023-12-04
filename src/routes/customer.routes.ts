import { Router } from "express"
import CustomerController from "../controllers/customer.controller"

const router = Router()
const product = CustomerController

router.post("/", product.createCustomer)
router.get("/", product.getCustomers)
router.get("/:id", product.byIdCustomer)
router.delete("/:id", product.deleteCustomer)
router.put("/:id", product.updateCustomer)

export default router
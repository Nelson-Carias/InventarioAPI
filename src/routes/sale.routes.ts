import {Router} from 'express'
import SaleController from "../controllers/sale.controller"
import { checkToken } from '../jwtvalidation/jwt.validation';
const router = Router();

const sale = SaleController

router.post("/",  sale.createSale)

router.get("/",  sale.getSales)

router.get("/:id",  sale.byIdSale)

router.delete("/:id",  sale.deleteSale)

router.put("/:id",  sale.updateSale)

export default router
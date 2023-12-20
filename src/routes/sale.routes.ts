import {Router} from 'express'
import SaleController from "../controllers/sale.controller"
import { checkToken } from '../jwtvalidation/jwt.validation';
const router = Router();

const sale = SaleController

router.post("/",  checkToken,    sale.createSale)

router.get("/",  checkToken,  sale.getSales)

router.get("/:id", checkToken,   sale.byIdSale)

router.delete("/:id",  checkToken,  sale.deleteSale)

router.put("/:id",  checkToken,  sale.updateSale)

export default router
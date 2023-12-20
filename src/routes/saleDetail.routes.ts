import { Router } from "express"
import SaleDetailController from "../controllers/salesDetails.controller" 
import { checkToken } from "../jwtvalidation/jwt.validation";
const router =  Router();

const saleDetail = SaleDetailController

router.post("/",  checkToken,   saleDetail.createSaleDetail)

router.get("/",  checkToken,  saleDetail.getSaleDetails)

router.get("/:id",  checkToken,   saleDetail.byIdSaleDetail)

router.delete("/:id",   checkToken,  saleDetail.deleteSaleDetail)

router.put("/:id",  checkToken,   saleDetail.updateSaleDetail)

export default router
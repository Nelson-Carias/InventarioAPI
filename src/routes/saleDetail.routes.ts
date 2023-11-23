import { Router } from "express"
import SaleDetailController from "../controllers/salesDetails.controller" 

const router =  Router();

const saleDetail = SaleDetailController

router.post("/", saleDetail.createSaleDetail)

router.get("/", saleDetail.getSaleDetails)

router.get("/:id", saleDetail.byIdSaleDetail)

router.delete("/:id", saleDetail.deleteSaleDetail)

router.put("/:id", saleDetail.updateSaleDetail)

export default router
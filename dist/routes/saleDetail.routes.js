"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const salesDetails_controller_1 = __importDefault(require("../controllers/salesDetails.controller"));
const router = (0, express_1.Router)();
const saleDetail = salesDetails_controller_1.default;
router.post("/", saleDetail.createSaleDetail);
router.get("/", saleDetail.getSaleDetails);
router.get("/:id", saleDetail.byIdSaleDetail);
router.delete("/:id", saleDetail.deleteSaleDetail);
router.put("/:id", saleDetail.updateSaleDetail);
exports.default = router;
//# sourceMappingURL=saleDetail.routes.js.map
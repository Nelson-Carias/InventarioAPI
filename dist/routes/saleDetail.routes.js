"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const salesDetails_controller_1 = __importDefault(require("../controllers/salesDetails.controller"));
const jwt_validation_1 = require("../jwtvalidation/jwt.validation");
const router = (0, express_1.Router)();
const saleDetail = salesDetails_controller_1.default;
router.post("/", jwt_validation_1.checkToken, saleDetail.createSaleDetail);
router.get("/", jwt_validation_1.checkToken, saleDetail.getSaleDetails);
router.get("/:id", jwt_validation_1.checkToken, saleDetail.byIdSaleDetail);
router.delete("/:id", jwt_validation_1.checkToken, saleDetail.deleteSaleDetail);
router.put("/:id", jwt_validation_1.checkToken, saleDetail.updateSaleDetail);
exports.default = router;
//# sourceMappingURL=saleDetail.routes.js.map
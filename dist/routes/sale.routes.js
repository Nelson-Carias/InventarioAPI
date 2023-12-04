"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sale_controller_1 = __importDefault(require("../controllers/sale.controller"));
const jwt_validation_1 = require("../jwtvalidation/jwt.validation");
const router = (0, express_1.Router)();
const sale = sale_controller_1.default;
router.post("/", sale.createSale);
router.get("/", sale.getSales);
router.get("/:id", jwt_validation_1.checkToken, sale.byIdSale);
router.delete("/:id", jwt_validation_1.checkToken, sale.deleteSale);
router.put("/:id", jwt_validation_1.checkToken, sale.updateSale);
exports.default = router;
//# sourceMappingURL=sale.routes.js.map
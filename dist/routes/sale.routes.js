"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sale_controller_1 = __importDefault(require("../controllers/sale.controller"));
const router = (0, express_1.Router)();
const sale = sale_controller_1.default;
router.post("/", sale.createSale);
router.get("/", sale.getSales);
router.get("/:id", sale.byIdSale);
router.delete("/:id", sale.deleteSale);
router.put("/:id", sale.updateSale);
exports.default = router;
//# sourceMappingURL=sale.routes.js.map
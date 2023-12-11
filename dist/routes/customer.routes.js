"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_controller_1 = __importDefault(require("../controllers/customer.controller"));
const router = (0, express_1.Router)();
const product = customer_controller_1.default;
router.post("/", product.createCustomer);
router.get("/", product.getCustomers);
router.get("/:id", product.byIdCustomer);
router.delete("/:id", product.deleteCustomer);
router.put("/:id", product.updateCustomer);
exports.default = router;
//# sourceMappingURL=customer.routes.js.map
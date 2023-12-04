"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_controller_1 = __importDefault(require("../controllers/customer.controller"));
const jwt_validation_1 = require("../jwtvalidation/jwt.validation");
const router = (0, express_1.Router)();
const product = customer_controller_1.default;
router.post("/", product.createCustomer);
router.get("/", product.getCustomers);
router.get("/:id", jwt_validation_1.checkToken, product.byIdCustomer);
router.delete("/:id", jwt_validation_1.checkToken, product.deleteCustomer);
router.put("/:id", jwt_validation_1.checkToken, product.updateCustomer);
exports.default = router;
//# sourceMappingURL=customer.routes.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const jwt_validation_1 = require("../jwtvalidation/jwt.validation");
const router = (0, express_1.Router)();
const product = product_controller_1.default;
router.post("/", jwt_validation_1.checkToken, product.createProduct);
router.get("/", jwt_validation_1.checkToken, product.getProducts);
router.get("/:id", jwt_validation_1.checkToken, product.byIdProduct);
router.delete("/:id", jwt_validation_1.checkToken, product.deleteProduct);
router.put("/:id", jwt_validation_1.checkToken, product.updateProduct);
exports.default = router;
//# sourceMappingURL=product.routes.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const router = (0, express_1.Router)();
const product = product_controller_1.default;
router.post("/", product.createProduct);
router.get("/", product.getProducts);
router.get("/:id", product.byIdProduct);
router.delete("/:id", product.deleteProduct);
router.put("/:id", product.updateProduct);
exports.default = router;
//# sourceMappingURL=product.routes.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supplier_controller_1 = __importDefault(require("../controllers/supplier.controller"));
const router = (0, express_1.Router)();
const proveedor = supplier_controller_1.default;
router.post("/", proveedor.createSupplier);
router.get('/', proveedor.getSuppliers);
router.get('/:id', proveedor.byIdSupplier);
router.delete('/:id', proveedor.deleteSupplier);
router.put('/:id', proveedor.updateSupplier);
exports.default = router;
//# sourceMappingURL=supplier.routes.js.map
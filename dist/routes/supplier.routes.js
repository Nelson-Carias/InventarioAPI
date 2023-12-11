"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supplier_controller_1 = __importDefault(require("../controllers/supplier.controller"));
const router = (0, express_1.Router)();
const supplier = supplier_controller_1.default;
router.post("/", supplier.createSupplier);
router.get('/', supplier.getSuppliers);
router.get('/:id', supplier.byIdSupplier);
router.delete('/:id', supplier.deleteSupplier);
router.put('/:id', supplier.updateSupplier);
exports.default = router;
//# sourceMappingURL=supplier.routes.js.map
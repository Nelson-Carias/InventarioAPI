"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supplier_controller_1 = __importDefault(require("../controllers/supplier.controller"));
const jwt_validation_1 = require("../jwtvalidation/jwt.validation");
const router = (0, express_1.Router)();
const supplier = supplier_controller_1.default;
router.post("/", jwt_validation_1.checkToken, supplier.createSupplier);
router.get('/', jwt_validation_1.checkToken, supplier.getSuppliers);
router.get('/:id', jwt_validation_1.checkToken, supplier.byIdSupplier);
router.delete('/:id', jwt_validation_1.checkToken, supplier.deleteSupplier);
router.put('/:id', jwt_validation_1.checkToken, supplier.updateSupplier);
exports.default = router;
//# sourceMappingURL=supplier.routes.js.map
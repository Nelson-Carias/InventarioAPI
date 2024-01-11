"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const Supplier_1 = require("../models/Supplier");
const data_source_1 = require("../data-source");
const typeorm_1 = require("typeorm");
const supplierRepository = data_source_1.AppDataSource
    .getRepository("Supplier");
class SupplierController {
}
_a = SupplierController;
SupplierController.createSupplier = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, contact, direction, } = req.body;
    try {
        const supplier = new Supplier_1.Supplier();
        supplier.name = name,
            supplier.contact = contact,
            supplier.direction = direction;
        yield supplierRepository.save(supplier);
        return resp.json({
            ok: true,
            STATUS_CODE: 200,
            message: 'Supplier was create with successfully'
        });
    }
    catch (error) {
        return resp.json({
            ok: false,
            STATUS_CODE: 500,
            message: `error = ${error.message}`
        });
    }
});
SupplierController.getSuppliers = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.query.name || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    console.log(req.query);
    try {
        const [supplier, total] = yield supplierRepository.findAndCount({
            where: { state: true, name: (0, typeorm_1.Like)(`%${name}%`) },
            order: { name: 'ASC' },
            skip: (page - 1) * limit,
            take: limit,
        });
        if (supplier.length > 0) {
            let totalPag = Number(total) / limit;
            if (totalPag % 1 !== 0) {
                totalPag = Math.trunc(totalPag) + 1;
            }
            let nextPag = page >= totalPag ? page : Number(page) + 1;
            let prevPag = page <= 1 ? page : page - 1;
            return resp.json({
                ok: true,
                supplier,
                total,
                totalPag,
                currentPag: Number(page),
                nextPag,
                prevPag,
            });
        }
    }
    catch (error) {
        ok: false;
        StatusCode: 500;
        message: `error = ${error.message}`;
    }
});
SupplierController.byIdSupplier = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const supplier = yield supplierRepository.findOne({
            where: {
                id,
                state: true
            }
        });
        return supplier ? resp.json({
            ok: true, supplier
        })
            : resp.json({
                ok: false,
                msg: "The id don´t exist"
            });
    }
    catch (error) {
        return resp.json({
            ok: false,
            message: `error = ${error.message}`
        });
    }
});
SupplierController.deleteSupplier = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const supplier = yield supplierRepository.findOne({ where: { id, state: true } });
        if (!supplier) {
            throw new Error("Not found");
        }
        supplier.state = false;
        yield supplierRepository.save(supplier);
        return resp.json({
            ok: true,
            msg: 'Supplier was delete'
        });
    }
    catch (error) {
        return resp.json({
            ok: false,
            message: `error = ${error.message}`
        });
    }
});
SupplierController.updateSupplier = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { name, contact, direction } = req.body;
    try {
        const supplier = yield supplierRepository.findOne({
            where: { id, state: true },
        });
        if (!name) {
            throw new Error('Not Found');
        }
        supplier.name = name,
            supplier.contact = contact,
            supplier.direction = direction;
        yield supplierRepository.save(supplier);
        return resp.json({ ok: true, STATUS_CODE: 200, message: 'Supplier was updated', supplier });
    }
    catch (error) {
        return resp.json({
            ok: false,
            STATUS_CODE: 500,
            message: `error = ${error.message}`
        });
    }
});
exports.default = SupplierController;
//# sourceMappingURL=supplier.controller.js.map
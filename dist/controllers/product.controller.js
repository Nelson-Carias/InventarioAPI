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
const data_source_1 = require("../data-source");
const Product_1 = require("../models/Product");
const Supplier_1 = require("../models/Supplier");
const typeorm_1 = require("typeorm");
const productRepository = data_source_1.AppDataSource.getRepository("Product");
class ProductController {
}
_a = ProductController;
//FUNCIONA
ProductController.createProduct = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, stock, supplierId } = req.body;
    const supplierRepository = data_source_1.AppDataSource.getRepository(Supplier_1.Supplier);
    let existingSupplier;
    try {
        if (supplierId) {
            existingSupplier = yield supplierRepository.findOne({
                where: { id: supplierId },
            });
            if (!existingSupplier) {
                return resp.json({
                    ok: false,
                    message: `Supplier whit ID '${supplierId} does not exist`,
                });
            }
        }
        else {
            if ((existingSupplier === null || existingSupplier === void 0 ? void 0 : existingSupplier.rol) && supplierId) {
                return resp.json({
                    ok: false,
                    message: "Cannot assign supplier to a regular product",
                });
            }
        }
        const product = new Product_1.Product();
        product.name = name,
            product.description = description,
            product.stock = stock,
            product.supplier = existingSupplier;
        product.price = price;
        yield productRepository.save(product);
        return resp.json({
            ok: true,
            STATUS_CODE: 200,
            message: "Product was create with successfully",
        });
    }
    catch (error) {
        return resp.json({
            ok: false,
            STATUS_CODE: 500,
            message: `error = ${error.message}`,
        });
    }
});
//FUNCIONA
ProductController.getProducts = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.query.name || "";
    const supplier = req.query.supplier || "";
    console.log(req.query);
    try {
        const products = yield productRepository.find({
            where: {
                state: true,
                name: (0, typeorm_1.Like)(`%${name}%`),
                supplier: { name: (0, typeorm_1.Like)(`%${supplier}%`) }
            },
            relations: { supplier: true },
        });
        return products.length > 0
            ? resp.json({
                ok: true,
                STATUS_CODE: 200,
                message: "list of products",
                products,
            })
            : resp.json({ ok: false, message: "Not found", products });
    }
    catch (error) {
        return resp.json({
            ok: false,
            STATUS_CODE: 500,
            message: `error = ${error.message}`,
        });
    }
});
//FUNCIONA
ProductController.byIdProduct = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const product = yield productRepository.findOne({
            where: { id, state: true },
        });
        return product
            ? resp.json({
                ok: true,
                product,
            })
            : resp.json({
                ok: false,
                message: "The id don't exist"
            });
    }
    catch (error) {
        return resp.json({
            ok: false,
            STATUS_CODE: 500,
            message: `error = ${error.message}`,
        });
    }
});
// FUNCIONA
ProductController.deleteProduct = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const product = yield productRepository.findOne({
            where: { id, state: true },
        });
        if (!product) {
            throw new Error("Not found");
        }
        product.state = false;
        yield productRepository.save(product);
        return resp.json({
            ok: true,
            STATUS_CODE: 200,
            message: "Product was delete",
        });
    }
    catch (error) {
        return resp.json({
            ok: false,
            STATUS_CODE: 500,
            message: `error => ${error.message}`,
        });
    }
});
// FUNCIONA
ProductController.updateProduct = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { name, description, price, stock, supplierId } = req.body;
    const supplierRepository = data_source_1.AppDataSource.getRepository(Supplier_1.Supplier);
<<<<<<< HEAD
    let existingSupplier;
=======
>>>>>>> c8c7b9766f36fc0a01a3d29e6b13ee7f2aed314c
    try {
        const product = yield productRepository.findOne({
            where: { id, state: true },
        });
        const existingSupplier = yield supplierRepository.findOne({ where: { id: supplierId } });
        if (!existingSupplier) {
            return resp.json({
                ok: false,
                msg: `Supplier with ID '${supplierId}' does not exist`,
            });
        }
<<<<<<< HEAD
        if (supplierId) {
            existingSupplier = yield supplierRepository.findOne({
                where: { id: supplierId },
            });
            if (!existingSupplier) {
                return resp.json({
                    ok: false,
                    message: `Supplier whit ID '${supplierId} does not exist`,
                });
            }
        }
        product.name = name,
            product.description = description,
            product.stock = stock,
            product.supplier = existingSupplier;
        product.price = price;
=======
        product.name = name,
            product.description = description,
            product.price = price,
            product.stock = stock,
            product.supplier = existingSupplier;
>>>>>>> c8c7b9766f36fc0a01a3d29e6b13ee7f2aed314c
        yield productRepository.save(product);
        return resp.json({
            ok: true,
            STATUS_CODE: 200,
            message: "Product was updated",
            product,
        });
    }
    catch (error) {
        return resp.json({
            ok: false,
            STATUS_CODE: 500,
            message: `error = ${error.message}`,
        });
    }
});
exports.default = ProductController;
//# sourceMappingURL=product.controller.js.map
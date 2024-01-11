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
        console.log(product);
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    console.log(req.query);
    const supplier = req.query.supplier || "";
    console.log(req.query);
    // try{
    //     const [product, total] = await productRepository.findAndCount({
    //       where: {
    //          state: true, name: Like(`%${name}%`), supplier:Like(`%${supplier}%`)}, relations: { supplier: true },
    //       order: { name: 'ASC' },
    //       skip: (page - 1) * limit,
    //       take: limit,
    //     });
    //     if (product.length > 0) {
    //       let totalPag: number = Number(total) / limit;
    //       if (totalPag % 1 !== 0) {
    //         totalPag = Math.trunc(totalPag) + 1;
    //       }
    //       let nextPag: number = page >= totalPag ? page : Number(page) + 1;
    //       let prevPag: number = page <= 1 ? page : page - 1;
    //       return resp.json({
    //         ok: true,
    //         product,
    //         total,
    //         totalPag,
    //         currentPag: Number(page),
    //         nextPag,
    //         prevPag,
    //       });
    //     }
    //       }
    //       catch(error){
    //           ok: false
    //           StatusCode: 500
    //           message: `error = ${error.message}`
    //       }
    const productRepository = data_source_1.AppDataSource.getRepository(Product_1.Product);
    try {
        const [product, total] = yield productRepository.findAndCount({
            where: {
                state: true, name: (0, typeorm_1.Like)(`%${name}%`)
            }, relations: { supplier: true },
            order: { name: 'ASC' },
            skip: (page - 1) * limit,
            take: limit,
        });
        let totalPag = Number(total) / limit;
        if (totalPag % 1 !== 0) {
            totalPag = Math.trunc(totalPag) + 1;
        }
        let nextPag = page >= totalPag ? page : Number(page) + 1;
        let prevPag = page <= 1 ? page : page - 1;
        return resp.json({
            ok: true,
            product,
            total,
            totalPag,
            currentPag: Number(page),
            nextPag,
            prevPag,
        });
    }
    catch (error) {
        ok: false;
        StatusCode: 500;
        message: `error = ${error.message}`;
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
    let existingSupplier;
    try {
        const product = yield productRepository.findOne({
            where: { id, state: true },
        });
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
        console.log(product);
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
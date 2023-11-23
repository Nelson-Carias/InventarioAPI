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
const Producto_1 = require("../models/Producto");
const Supplier_1 = require("../models/Supplier");
const typeorm_1 = require("typeorm");
const productoRepository = data_source_1.AppDataSource.getRepository(Producto_1.Producto);
class ProductoController {
}
_a = ProductoController;
ProductoController.createProducto = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, stock, proveedorId } = req.body;
    const proveedorRepository = data_source_1.AppDataSource.getRepository(Supplier_1.Supplier);
    let existingProveedor;
    try {
        if (proveedorId) {
            existingProveedor = yield proveedorRepository.findOne({ where: { id: proveedorId } });
            if (!existingProveedor) {
                return resp.json({
                    ok: false,
                    msg: `Proveedor with ID '${proveedorId}' does not exist`,
                });
            }
        }
        else {
            if ((existingProveedor === null || existingProveedor === void 0 ? void 0 : existingProveedor.rol) && proveedorId) {
                return resp.json({
                    ok: false,
                    msg: 'Cannot assing supplier to a regular product'
                });
            }
        }
        const product = new Producto_1.Producto();
        product.name = name,
            product.description = description,
            product.price = price,
            product.stock = stock,
            product.proveedor = existingProveedor;
        yield productoRepository.save(product);
        return resp.json({
            ok: true,
            STATUS_CODE: 200,
            message: 'Product was create with successfully'
        });
    }
    catch (error) {
        return resp.json({
            ok: false,
            message: `error = ${error.message}`
        });
    }
});
ProductoController.getProductos = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.query.name || "";
    const proveedor = req.query.proveedor || "";
    console.log(req.query);
    try {
        const products = yield productoRepository.find({
            where: {
                state: true,
                name: (0, typeorm_1.Like)(`%${name}%`),
                proveedor: { name: (0, typeorm_1.Like)(`%${proveedor}%`) }
            },
            relations: { proveedor: true },
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
ProductoController.byIdProducto = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const product = yield productoRepository.findOne({
            where: { id, state: true }
        });
        return product
            ? resp.json({
                ok: true, product
            }) : resp.json({ ok: false, message: "The id don't exist"
        });
    }
    catch (error) {
        return resp.json({
            ok: false,
            message: `error = ${error.message}`
        });
    }
});
ProductoController.deleteProducto = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const product = yield productoRepository.findOne({
            where: { id, state: true }
        });
        if (!product) {
            throw new Error("Not fund");
        }
        product.state = false;
        yield productoRepository.save(product);
        return resp.json({
            ok: true,
            message: "Product was delete"
        });
    }
    catch (error) {
        return resp.json({
            ok: false,
            message: `error => ${error.message}`
        });
    }
});
ProductoController.updateProducto = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { stock } = req.body;
    try {
        const product = yield productoRepository.findOne({
            where: { id, state: true },
        });
        if (!stock) {
            throw new Error('Not Fund');
        }
        product.stock = stock;
        yield productoRepository.save(product);
        return resp.json({
            ok: true,
            STATUS_CODE: 200,
            message: 'Product was updated', product
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
exports.default = ProductoController;
//# sourceMappingURL=producto.controller.js.map
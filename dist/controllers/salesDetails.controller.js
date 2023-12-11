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
const SaleDetail_1 = require("./../models/SaleDetail");
const data_source_1 = require("../data-source");
const Sale_1 = require("../models/Sale");
const Product_1 = require("../models/Product");
class SaleDetailController {
}
_a = SaleDetailController;
SaleDetailController.createSaleDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, unitPrice, subTotal, saleId, productId } = req.body;
    const saleDetailRepository = data_source_1.AppDataSource.getRepository(SaleDetail_1.SaleDetail);
    const saleRepository = data_source_1.AppDataSource.getRepository(Sale_1.Sale);
    const productRepository = data_source_1.AppDataSource.getRepository(Product_1.Product);
    try {
        const sale = yield saleRepository.findOne({ where: { id: saleId } });
        if (!sale) {
            return res.json({
                ok: false,
                StatusCode: 404,
                message: `Sale with ID  ${saleId} does not exist`,
            });
        }
        const product = yield productRepository.findOne({
            where: { id: productId },
        });
        if (!product) {
            return res.json({
                ok: false,
                StatusCode: 404,
                message: `Product with ID ${productId} does not exist`,
            });
        }
        const saleDetail = new SaleDetail_1.SaleDetail();
        saleDetail.amount = amount;
        saleDetail.unitPrice = unitPrice;
        saleDetail.subTotal = amount * unitPrice;
        saleDetail.sale = sale;
        saleDetail.product = product;
        console.log(saleDetail);
        yield saleDetailRepository.save(saleDetail);
        return res.json({
            ok: true,
            StatusCode: 200,
            message: `SaleDetail was create with successfully`,
        });
    }
    catch (error) {
        return res.json({
            ok: false,
            StatusCode: 500,
            message: `error = ${error.message}`,
        });
    }
});
SaleDetailController.getSaleDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const saleDetailRepository = data_source_1.AppDataSource.getRepository(SaleDetail_1.SaleDetail);
    try {
        const saleDetails = yield saleDetailRepository.find({
            where: { state: true },
            relations: { sale: true, product: true },
        });
        saleDetails.length > 0
            ? res.json({ ok: true, saleDetails })
            : res.json({ ok: false, msg: "Not found" });
    }
    catch (error) {
        return res.json({
            ok: false,
            StatusCode: 500,
            message: `error = ${error.message}`,
        });
    }
});
SaleDetailController.byIdSaleDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const saleDetailRepository = data_source_1.AppDataSource.getRepository(SaleDetail_1.SaleDetail);
    const id = parseInt(req.params.id);
    try {
        const saleDetail = yield saleDetailRepository.findOne({
            where: { id, state: true },
        });
        return saleDetail
            ? res.json({ ok: true, saleDetail })
            : res.json({ ok: false, msg: "Not found" });
    }
    catch (error) {
        return res.json({
            ok: false,
            StatusCode: 500,
            message: `error = ${error.message}`,
        });
    }
});
SaleDetailController.deleteSaleDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const saleDetailRepository = data_source_1.AppDataSource.getRepository(SaleDetail_1.SaleDetail);
    const id = parseInt(req.params.id);
    try {
        const saleDetail = yield saleDetailRepository.findOne({
            where: { id, state: true },
        });
        if (!saleDetail) {
            return res.json({
                ok: false,
                StatusCode: 404,
                message: `Not found`,
            });
        }
        saleDetail.state = false;
        yield saleDetailRepository.save(saleDetail);
        return res.json({
            ok: true,
            StatusCode: 200,
            message: `SaleDetail was delete`,
        });
    }
    catch (error) {
        return res.json({
            ok: false,
            StatusCode: 500,
            message: `error = ${error.message}`,
        });
    }
});
SaleDetailController.updateSaleDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const saleDetailRepository = data_source_1.AppDataSource.getRepository(SaleDetail_1.SaleDetail);
    const id = parseInt(req.params.id);
    const { amount, unitPrice, subTotal, productId, saleId } = req.body;
    try {
        const saleDetail = yield saleDetailRepository.findOne({
            where: { id, state: true },
        });
        if (!saleDetail) {
            throw new Error("Not found");
        }
        saleDetail.amount = amount;
        saleDetail.unitPrice = unitPrice;
        saleDetail.subTotal = amount * unitPrice;
        saleDetail.sale = saleId;
        saleDetail.product = productId;
        yield saleDetailRepository.save(saleDetail);
        return res.json({
            ok: true,
            StatusCode: 200,
            message: `saleDetail was update`,
            saleDetail,
        });
    }
    catch (error) {
        return res.json({
            ok: false,
            StatusCode: `error = ${error.message}`,
        });
    }
});
exports.default = SaleDetailController;
//# sourceMappingURL=salesDetails.controller.js.map
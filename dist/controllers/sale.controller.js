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
const Sale_1 = require("./../models/Sale");
const data_source_1 = require("../data-source");
const Customer_1 = require("../models/Customer");
class SaleController {
}
_a = SaleController;
//Save Sale
SaleController.createSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { total, customerId } = req.body;
    const saleRepository = data_source_1.AppDataSource.getRepository(Sale_1.Sale);
    const customerRepository = data_source_1.AppDataSource.getRepository(Customer_1.Customer);
    let existingCustomer;
    try {
        if (customerId) {
            existingCustomer = yield customerRepository.findOne({
                where: { id: customerId },
            });
            if (!existingCustomer) {
                return res.json({
                    ok: false,
                    msg: `Sale with ID '${customerId}' does not exist`,
                });
            }
        }
        // else{
        //     if(existingUser?.user && userId){
        //         return res.json({
        //             ok:false,
        //             msg: 'Cannot assing supplier to a regular sale'
        //         })
        //     }
        // }
        const sale = new Sale_1.Sale();
        sale.total = total;
        sale.customer = existingCustomer;
        yield saleRepository.save(sale);
        return res.json({
            ok: true,
            STATUS_CODE: 200,
            message: "Sale was create with successfully",
        });
    }
    catch (error) {
        return res.json({
            ok: false,
            STATUS_CODE: 500,
            message: `error = ${error.message}`,
        });
    }
});
SaleController.getSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const saleRepository = data_source_1.AppDataSource.getRepository(Sale_1.Sale);
    try {
        const sales = yield saleRepository.find({
            where: { state: true },
            relations: { customer: true },
        });
        return sales.length > 0
            ? res.json({ ok: true, sales })
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
SaleController.byIdSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const saleRepository = data_source_1.AppDataSource.getRepository(Sale_1.Sale);
    const id = parseInt(req.params.id);
    try {
        const sale = yield saleRepository.findOne({ where: { id, state: true } });
        return sale
            ? res.json({ ok: true, sale })
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
SaleController.deleteSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const saleRepository = data_source_1.AppDataSource.getRepository(Sale_1.Sale);
    const id = parseInt(req.params.id);
    try {
        const sale = yield saleRepository.findOne({ where: { id, state: true } });
        if (!sale) {
            return res.json({
                ok: false,
                StatusCode: 404,
                message: `Not Found`,
            });
        }
        sale.state = false;
        yield saleRepository.save(sale);
        return res.json({
            ok: true,
            StatusCode: 200,
            message: `Sale was delete`,
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
SaleController.updateSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const saleRepository = data_source_1.AppDataSource.getRepository(Sale_1.Sale);
    const id = parseInt(req.params.id);
    const { total, customerId } = req.body;
    try {
        console.log({ id, total, customerId });
        const sale = yield saleRepository.findOne({ where: { id, state: true } });
        console.log("SALEEEEEEEEEEEEEEEEEEEEEEEE", sale);
        if (!total) {
            throw new Error("Not found");
        }
        sale.total = total;
        sale.customer = customerId;
        yield saleRepository.save(sale);
        return res.json({
            ok: true,
            StatusCode: 200,
            message: "Sale was updated",
            sale,
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
exports.default = SaleController;
//# sourceMappingURL=sale.controller.js.map
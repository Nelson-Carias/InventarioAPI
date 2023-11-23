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
const data_source_1 = require("./../data-source");
const Customer_1 = require("../models/Customer");
const typeorm_1 = require("typeorm");
const customerRepository = data_source_1.AppDataSource.getRepository(Customer_1.Customer);
class CustomerController {
}
_a = CustomerController;
CustomerController.createCustomer = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastName, direction } = req.body;
    try {
        const customer = new Customer_1.Customer();
        customer.name = name,
            customer.lastName = lastName,
            customer.direction = direction;
        yield customerRepository.save(customer);
        return resp.json({
            ok: true,
            STATUS_CODE: 200,
            message: 'Customer was create with successfully'
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
CustomerController.getCustomers = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.query.name || "";
    console.log(req.query);
    try {
        const customer = yield customerRepository.find({
            where: {
                state: true,
                name: (0, typeorm_1.Like)(`%${name}%`)
            },
        });
        return customer.length > 0
            ? resp.json({
                ok: true,
                customer
            })
            : resp.json({
                ok: false,
                message: 'Not found'
            });
    }
    catch (error) {
        return resp.json({
            ok: false,
            message: `error = ${error.message}`
        });
    }
});
exports.default = CustomerController;
//# sourceMappingURL=customer.controller.js.map
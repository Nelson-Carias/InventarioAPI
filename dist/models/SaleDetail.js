"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleDetail = void 0;
const typeorm_1 = require("typeorm");
const Sale_1 = require("./Sale");
const Product_1 = require("./Product");
let SaleDetail = class SaleDetail {
};
exports.SaleDetail = SaleDetail;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], SaleDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Sale_1.Sale),
    __metadata("design:type", Sale_1.Sale)
], SaleDetail.prototype, "sale", void 0);
__decorate([
    (0, typeorm_1.RelationId)((saleDetail) => saleDetail.sale),
    __metadata("design:type", Number)
], SaleDetail.prototype, "saleId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Product_1.Product),
    __metadata("design:type", Product_1.Product)
], SaleDetail.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.RelationId)((saleDetail) => saleDetail.product),
    __metadata("design:type", Number)
], SaleDetail.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SaleDetail.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SaleDetail.prototype, "unitPrice", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SaleDetail.prototype, "subTotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], SaleDetail.prototype, "state", void 0);
exports.SaleDetail = SaleDetail = __decorate([
    (0, typeorm_1.Entity)()
], SaleDetail);
//# sourceMappingURL=SaleDetail.js.map
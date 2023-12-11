import { error } from "console";
import { SaleDetail } from "./../models/SaleDetail";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Sale } from "../models/Sale";
import { Product } from "../models/Product";

class SaleDetailController {
  static createSaleDetail = async (req: Request, res: Response) => {
    const { amount, unitPrice, subTotal, saleId, productId } = req.body;
    const saleDetailRepository = AppDataSource.getRepository(SaleDetail);
    const saleRepository = AppDataSource.getRepository(Sale);
    const productRepository = AppDataSource.getRepository(Product);
    try {
      const sale = await saleRepository.findOne({ where: { id: saleId } });
      if (!sale) {
        return res.json({
          ok: false,
          StatusCode: 404,
          message: `Sale with ID  ${saleId} does not exist`,
        });
      }

      const product = await productRepository.findOne({
        where: { id: productId },
      });
      if (!product) {
        return res.json({
          ok: false,
          StatusCode: 404,
          message: `Product with ID ${productId} does not exist`,
        });
      }

      const saleDetail = new SaleDetail();
      saleDetail.amount = amount;
      saleDetail.unitPrice = unitPrice;
      saleDetail.subTotal = amount * unitPrice;
      saleDetail.sale = sale;
      saleDetail.product = product;

      console.log(saleDetail);

      await saleDetailRepository.save(saleDetail);

      return res.json({
        ok: true,
        StatusCode: 200,
        message: `SaleDetail was create with successfully`,
      });
    } catch (error) {
      return res.json({
        ok: false,
        StatusCode: 500,
        message: `error = ${error.message}`,
      });
    }
  };

  static getSaleDetails = async (req: Request, res: Response) => {
    const saleDetailRepository = AppDataSource.getRepository(SaleDetail);
    try {
      const saleDetails = await saleDetailRepository.find({
        where: { state: true },
        relations: { sale: true, product: true },
      });
       saleDetails.length > 0
        ? res.json({ ok: true, saleDetails })
        : res.json({ ok: false, msg: "Not found" });
    } catch (error) {
      return res.json({
        ok: false,
        StatusCode: 500,
        message: `error = ${error.message}`,
      });
    }
  };

  static byIdSaleDetail = async (req: Request, res: Response) => {
    const saleDetailRepository = AppDataSource.getRepository(SaleDetail);
    const id = parseInt(req.params.id);
    try {
      const saleDetail = await saleDetailRepository.findOne({
        where: { id, state: true },
      });
      return saleDetail
        ? res.json({ ok: true, saleDetail })
        : res.json({ ok: false, msg: "Not found" });
    } catch (error) {
      return res.json({
        ok: false,
        StatusCode: 500,
        message: `error = ${error.message}`,
      });
    }
  };

  static deleteSaleDetail = async (req: Request, res: Response) => {
    const saleDetailRepository = AppDataSource.getRepository(SaleDetail);
    const id = parseInt(req.params.id);
    try {
      const saleDetail = await saleDetailRepository.findOne({
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
      await saleDetailRepository.save(saleDetail);
      return res.json({
        ok: true,
        StatusCode: 200,
        message: `SaleDetail was delete`,
      });
    } catch (error) {
      return res.json({
        ok: false,
        StatusCode: 500,
        message: `error = ${error.message}`,
      });
    }
  };

  static updateSaleDetail = async (req: Request, res: Response) => {
    const saleDetailRepository = AppDataSource.getRepository(SaleDetail);
    const id = parseInt(req.params.id);
    const { amount, unitPrice, subTotal, productId, saleId } = req.body;

    try {
      const saleDetail = await saleDetailRepository.findOne({
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

      await saleDetailRepository.save(saleDetail);
      return res.json({
        ok: true,
        StatusCode: 200,
        message: `saleDetail was update`,
        saleDetail,
      });
    } catch (error) {
      return res.json({
        ok: false,
        StatusCode: `error = ${error.message}`,
      });
    }
  };
}

export default SaleDetailController;

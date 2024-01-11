import { Customer } from './../models/Customer';
import { error } from "console";
import { Sale } from "./../models/Sale";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { json } from "stream/consumers";
import { Like } from 'typeorm';

class SaleController {
  //Save Sale
  static createSale = async (req: Request, res: Response) => {
    const { total, customerId } = req.body;
    const saleRepository = AppDataSource.getRepository(Sale);
    const customerRepository = AppDataSource.getRepository(Customer);
    let existingCustomer;
    try {
      if (customerId) {
        existingCustomer = await customerRepository.findOne({
          where: { id: customerId },
        });
        if (!existingCustomer) {
          return res.json({
            ok: false,
            msg: `Sale with ID '${customerId}' does not exist`,
          });
        }
      }
     
      const sale = new Sale();

      sale.total = total;
      sale.customer = existingCustomer;

      await saleRepository.save(sale);

      return res.json({
        ok: true,
        STATUS_CODE: 200,
        message: "Sale was create with successfully",
      });
    } catch (error) {
      return res.json({
        ok: false,
        STATUS_CODE: 500,
        message: `error = ${error.message}`,
      });
    }
  };

  static getSales = async (req: Request, res: Response) => {
    const saleRepository = AppDataSource.getRepository(Sale);
    const customer = req.query.customer || ""
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    console.log(req.query);
    try{
    const [sales, total] = await saleRepository.findAndCount({
        where: { state: true, customer:{name: Like(`%${customer}%`)}},
        order: { customer: 'ASC' },
        skip: (page - 1) * limit,
        take: limit,
      });       
        let totalPag: number = Number(total) / limit;
        if (totalPag % 1 !== 0) {
          totalPag = Math.trunc(totalPag) + 1;
        }
        let nextPag: number = page >= totalPag ? page : Number(page) + 1;
        let prevPag: number = page <= 1 ? page : page - 1;
        return res.json({
          ok: true,
          sales,
          total,
          totalPag,
          currentPag: Number(page),
          nextPag,
          prevPag,
        });   
        }    catch(error){
            ok: false
            StatusCode: 500
            message: `error = ${error.message}`
        }
  };

  static byIdSale = async (req: Request, res: Response) => {
    const saleRepository = AppDataSource.getRepository(Sale);
    const id = parseInt(req.params.id);
    try {
      const sale = await saleRepository.findOne({ where: { id, state: true } });
      return sale
        ? res.json({ ok: true, sale })
        : res.json({ ok: false, msg: "Not found" });
    } catch (error) {
      return res.json({
        ok: false,
        StatusCode: 500,
        message: `error = ${error.message}`,
      });
    }
  };

  static deleteSale = async (req: Request, res: Response) => {
    const saleRepository = AppDataSource.getRepository(Sale);
    const id = parseInt(req.params.id);
    try {
      const sale = await saleRepository.findOne({ where: { id, state: true } });
      if (!sale) {
        return res.json({
          ok: false,
          StatusCode: 404,
          message: `Not Found`,
        });
      }

      sale.state = false;
      await saleRepository.save(sale);
      return res.json({
        ok: true,
        StatusCode: 200,
        message: `Sale was delete`,
      });
    } catch (error) {
      return res.json({
        ok: false,
        StatusCode: 500,
        message: `error = ${error.message}`,
      });
    }
  };

  static updateSale = async (req: Request, res: Response) => {
    const saleRepository = AppDataSource.getRepository(Sale);
    const id = parseInt(req.params.id);
    const { total, customerId } = req.body;
    try {
      console.log({ id, total, customerId });
      const sale = await saleRepository.findOne({ where: { id, state: true } });

      console.log("SALEEEEEEEEEEEEEEEEEEEEEEEE", sale);

      if (!total) {
        throw new Error("Not found");
      }

      sale.total = total;
      sale.customer = customerId;

      await saleRepository.save(sale);
      return res.json({
        ok: true,
        StatusCode: 200,
        message: "Sale was updated",
        sale,
      });
    } catch (error) {
      return res.json({
        ok: false,
        StatusCode: 500,
        message: `error = ${error.message}`,
      });
    }
  };
}

export default SaleController;

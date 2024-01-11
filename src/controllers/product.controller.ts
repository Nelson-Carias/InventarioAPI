import { Rol } from './../models/Rol';

import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../models/Product";
import { Supplier } from "../models/Supplier";
import { error } from "console";
import { json } from "stream/consumers";
import { Like } from "typeorm";

const productRepository = AppDataSource.getRepository("Product");

class ProductController {
  //FUNCIONA
  static createProduct = async (req: Request, resp: Response) => {
    const { name, description, price, stock, supplierId } = req.body;
    const supplierRepository = AppDataSource.getRepository(Supplier);
    let existingSupplier;
    try {
      if (supplierId) {
        existingSupplier = await supplierRepository.findOne({
          where: { id: supplierId },
        });
        if (!existingSupplier) {
          return resp.json({
            ok: false,
            message: `Supplier whit ID '${supplierId} does not exist`,
          });
        }
      } else {
        if (existingSupplier?.rol && supplierId) {
          return resp.json({
            ok: false,
            message: "Cannot assign supplier to a regular product",
          });
        }
      }

      const product = new Product();

      product.name = name,
      product.description = description,
      
      product.stock = stock,
      product.supplier = existingSupplier;
      product.price = price

      await productRepository.save(product);
      console.log(product)

      return resp.json({
        ok: true,
        STATUS_CODE: 200,
        message: "Product was create with successfully",
       
      });
    } catch (error) {
      return resp.json({
        ok: false,
        STATUS_CODE: 500,
        message: `error = ${error.message}`,
      });
    }
  };

  //FUNCIONA
  static getProducts = async (req: Request, resp: Response) => {
    const name = req.query.name || ""
     const page = parseInt(req.query.page as string) || 1
     const limit = parseInt(req.query.limit as string) || 10
    console.log(req.query);
     const supplier = req.query.supplier || ""

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
    
const productRepository = AppDataSource.getRepository(Product);
try {
  const [product, total] = await productRepository.findAndCount({
          where: {
             state: true, name: Like(`%${name}%`)}, relations: { supplier: true },
          order: { name: 'ASC' },
          skip: (page - 1) * limit,
          take: limit,
        });
        if (product.length > 0) {
          
                let totalPag: number = Number(total) / limit;
                if (totalPag % 1 !== 0) {
                  totalPag = Math.trunc(totalPag) + 1;
                }
                
                let nextPag: number = page >= totalPag ? page : Number(page) + 1;
                let prevPag: number = page <= 1 ? page : page - 1;
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
                   
                }
                catch(error){
                    ok: false
                    StatusCode: 500
                    message: `error = ${error.message}`
                }
              
  };

  //FUNCIONA
  static byIdProduct = async (req: Request, resp: Response) => {
    const id = parseInt(req.params.id);
    try {
      const product = await productRepository.findOne({
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
    } catch (error) {
      return resp.json({
        ok: false,
        STATUS_CODE: 500,
        message: `error = ${error.message}`,
      });
    }
  };

  // FUNCIONA
  static deleteProduct = async (req: Request, resp: Response) => {
    const id = parseInt(req.params.id);
    try {
      const product = await productRepository.findOne({
        where: { id, state: true },
      });
      if (!product) {
        throw new Error("Not found");
      }
      product.state = false;
      await productRepository.save(product);
      return resp.json({
        ok: true,
        STATUS_CODE: 200,
        message: "Product was delete",
      });
    } catch (error) {
      return resp.json({
        ok: false,
        STATUS_CODE: 500,
        message: `error => ${error.message}`,
      });
    }
  };

  // FUNCIONA
  static updateProduct = async (req: Request, resp: Response) => {
    const id = parseInt(req.params.id);
    const { name, description, price, stock, supplierId } = req.body;
    const supplierRepository = AppDataSource.getRepository(Supplier);
    let existingSupplier;
    try {
      const product = await productRepository.findOne({
        where: { id, state: true },
      });
      
      if (supplierId) {
        existingSupplier = await supplierRepository.findOne({
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
      product.price = price
      console.log(product)
      await productRepository.save(product);
      
      return resp.json({
        ok: true,
        STATUS_CODE: 200,
        message: "Product was updated",
        product,
      });
    } catch (error) {
      return resp.json({
        ok: false,
        STATUS_CODE: 500,
        message: `error = ${error.message}`,
      });
    }
  };
}

export default ProductController;
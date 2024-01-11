import { Product } from '../models/Product';
import { Supplier } from '../models/Supplier';
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { error } from "console";
import { type } from "os";
import { Like } from 'typeorm';

const supplierRepository = AppDataSource 
    .getRepository("Supplier"); 

class SupplierController{
    static createSupplier = async(req:Request, resp:Response)=>{
        const { name, contact, direction, } = req.body
        try {
            const supplier = new Supplier()
            supplier.name = name,
            supplier.contact = contact,
            supplier.direction = direction

            await supplierRepository.save(supplier) 

            return resp.json({ 
                ok: true, 
                STATUS_CODE: 200, 
                message: 'Supplier was create with successfully'
            })
        } catch (error) {
            return resp.json({
                ok: false, 
                STATUS_CODE: 500, 
                message: `error = ${error.message}`
            })
        }
    }

    static getSuppliers = async (req:Request, resp:Response)=>{
        const name = req.query.name || ""
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10
        console.log(req.query);

        try{
        const [supplier, total] = await supplierRepository.findAndCount({
            where: { state: true, name: Like(`%${name}%`)},
            order: { name: 'ASC' },
            skip: (page - 1) * limit,
            take: limit,
          });
    
         
            let totalPag: number = Number(total) / limit;
            if (totalPag % 1 !== 0) {
              totalPag = Math.trunc(totalPag) + 1;
            }
            let nextPag: number = page >= totalPag ? page : Number(page) + 1;
            let prevPag: number = page <= 1 ? page : page - 1;
            return resp.json({
              ok: true,
              supplier,
              total,
              totalPag,
              currentPag: Number(page),
              nextPag,
              prevPag,
            });
          } catch(error){
            ok: false
            StatusCode: 500
            message: `error = ${error.message}`
        }
               
            
           

       
    }

    static byIdSupplier = async (req:Request, resp:Response)=>{
        const id = parseInt(req.params.id) 
        try {
            const supplier = await supplierRepository.findOne({ 
                where: {
                    id,  
                    state: true 
                }
            })
            return supplier ? resp.json({ 
                ok: true, supplier
            }) 
            : resp.json({ 
                ok: false, 
                msg: "The id don´t exist" 
            });
        } catch (error) {
            return resp.json({ 
                ok: false, 
                message: `error = ${error.message}` 
            })
        }
    }
    
    static deleteSupplier = async(req:Request, resp:Response)=>{
        const id = parseInt(req.params.id)
        try{
            const supplier = await supplierRepository.findOne({where:{id, state: true}})

            if(!supplier){
                throw new Error("Not found")
            }
            supplier.state = false;

            await supplierRepository.save(supplier)

            return resp.json({ 
                ok: true, 
                msg: 'Supplier was delete'
            })  
        }catch(error){
            return resp.json({ 
                ok:false, 
                message: `error = ${error.message}`
            }) 
        }
    }
    
    static updateSupplier = async(req:Request, resp:Response)=>{
        const id = parseInt(req.params.id)
        const {name, contact, direction} = req.body
        try{   
            const supplier = await supplierRepository.findOne({ 
                where: { id, state: true },})

            if(!name){
                throw new Error('Not Found')
            }

            supplier.name = name,
            supplier.contact = contact,
            supplier.direction = direction
            await supplierRepository.save(supplier)
            return resp.json({ ok: true, STATUS_CODE:200, message: 'Supplier was updated', supplier})
        }
        catch (error){
            return resp.json ({
                ok:false, 
                STATUS_CODE:500,   
                message: `error = ${error.message}`
            })
        }
    }
}

export default SupplierController


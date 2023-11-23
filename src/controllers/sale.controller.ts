import { error } from 'console';
import { Sale } from './../models/Sale';
import {Request, Response} from "express"
import { AppDataSource } from "../data-source"
import { json } from 'stream/consumers';
import { Customer } from '../models/Customer';

class SaleController{
    //Save Sale
    static createSale = async (req:Request, res:Response) =>{
        const{total, customerId} = req.body
        const saleRepository = AppDataSource.getRepository(Sale)
        const customerRepository = AppDataSource.getRepository(Customer)
        let existingCustomer
        try{
            if(customerId){
                existingCustomer = await customerRepository.findOne({where: {id: customerId}})
                if(!existingCustomer){
                    return res.json({
                        ok: false,
                        msg: `Sale with ID '${customerId}' does not exist`,
                    })
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

            const sale = new Sale()
            
            sale.total = total
            sale.customer = existingCustomer

            await saleRepository.save(sale)

            return res.json({
                ok: true,
                STATUS_CODE: 200,
                message: 'Sale was create with successfully'
            })
        }catch(error){
            return res.json({
                ok: false,
                STATUS_CODE: 500,
                message: `error = ${error.message}`
            })
        }
    }

    static getSales = async (req:Request, res:Response) =>{
        const saleRepository = AppDataSource.getRepository(Sale)
        try{
            const sales = await saleRepository.find({where : {state:true}})
            return sales.length > 0?
            res.json({ok: true, sales}) : res.json({ok:false, msg: "Not found"})
        }catch(error){
            return res.json({
                ok: false,
                StatusCode: 500,
                message: `error = ${error.message}`
            })
        }
    }

    static byIdSale = async (req:Request, res:Response)=> {
        const saleRepository = AppDataSource.getRepository(Sale)
        const id = parseInt(req.params.id)
        try{
            const sale = await saleRepository.findOne({where:{id, state:true}})
            return sale?
            res.json({ok:true, sale}) : res.json({ok:false, msg: 'Not found'})
        }catch(error){
            return res.json({
                ok:false,
                StatusCode: 500,
                message: `error = ${error.message}`
            })
        }
    }

    static deleteSale = async (req:Request, res: Response)=>{
        const saleRepository = AppDataSource.getRepository(Sale)
        const id = parseInt(req.params.id)
        try{
            const sale = await saleRepository.findOne({where: {id, state:true}})
            if(!sale){
                return res.json({
                    ok: false,
                    StatusCode: 404,
                    message: `Not Found`
                })
            }

            sale.state = false;
            await saleRepository.save(sale)
            return res.json({
                ok:true,
                StatusCode: 200,
                message: `Sale was delete`
            })
        }catch(error){
           return res.json({
                ok: false,
                StatusCode: 500,
                message: `error = ${error.message}`
            })
        }
    }

    static updateSale = async(req:Request, res:Response)=>{
        const saleRepository = AppDataSource.getRepository(Sale)
        const id = parseInt(req.params.id)
        const {total} = req.body
        try{
            const sale = await saleRepository.findOne({where: {id, state:true}})

            if (!total){
                throw new Error("Not found")
            }

            sale.total = total

            await saleRepository.save(sale)
            return res.json({
                ok: true,
                StatusCode: 200,
                message: 'Sale was updated', sale
            })
        }catch(error){
            return res.json({
                ok: false,
                StatusCode: 500,
                message: `error = ${error.message}`
            })
        }
    }
}

export default SaleController
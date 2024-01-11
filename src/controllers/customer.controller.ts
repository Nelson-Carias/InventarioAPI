import { AppDataSource } from './../data-source';
import { Request, Response } from "express";
import { error } from "console";
import { Customer } from '../models/Customer';
import { Like } from 'typeorm';

const customerRepository = AppDataSource    
.getRepository("Customer"); 

class CustomerController{
    static createCustomer = async(req:Request, resp:Response)=>{
        const { name, lastName, direction, } = req.body
        try{
            const customer = new Customer()
            customer.name = name,
            customer.lastName = lastName,
            customer.direction = direction

            await customerRepository.save(customer)

            return resp.json({ 
                ok: true, 
                STATUS_CODE: 200, 
                message: 'Customer was create with successfully'
            })

        } catch (error) {
            return resp.json({
                ok: false, 
                STATUS_CODE: 500, 
                message: `error = ${error.message}`
            })
        }
    }

    static getCustomers = async (req:Request, resp:Response)=>{
        const name = req.query.name || ""
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10
        console.log(req.query);
        try{
        const [customer, total] = await customerRepository.findAndCount({
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
              customer,
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
        // const name = req.query.name || ""
        // console.log(req.query);
        // try {
        //     const customer = await customerRepository.find({ 
        //         where: {
        //             state:true,
        //             name: Like(`%${name}%`)
        //         },
        //     })
        //     return customer.length>0 
        //         ?resp.json({
        //             ok:true, 
        //             customer
        //         }) 
        //         : resp.json({
        //             ok:false, 
        //             message:'Not found'
        //         })
        // } catch (error) {
        //     return resp.json({
        //         ok: false, 
        //         message: `error = ${error.message}`
        //     })
        // }
    }

    static byIdCustomer = async (req:Request, resp:Response)=>{
        const id = parseInt(req.params.id) 
        try {
            const customer = await customerRepository.findOne({ 
                where: {id,  state: true }
            })
            return customer ? resp.json({ 
                ok: true, customer
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

    static deleteCustomer = async(req:Request, resp:Response)=>{
        const id = parseInt(req.params.id)
        try{
            const customer = await customerRepository.findOne({
                where:{id, state: true}
            })

            if(!customer){
                throw new Error("Not found")
            }
            customer.state = false;

            await customerRepository.save(customer)

            return resp.json({ 
                ok: true, 
                msg: 'Customer was delete'
            })  
        }catch(error){
            return resp.json({ 
                ok:false, 
                message: error = `${error.message}`
            }) 
        }
    }

    static updateCustomer = async(req:Request, resp:Response)=>{
        const id = parseInt(req.params.id)
        const {name, lastName, direction} = req.body
        try{   
            const customer = await customerRepository.findOne({ 
                where: { id, state: true },})

            if(!name){
                throw new Error('Not Found')
            }

            customer.name = name,
            customer.lastName = lastName,
            customer.direction = direction
            await customerRepository.save(customer)
            return resp.json({ 
                ok: true, 
                STATUS_CODE:200, 
                message: 'Customer was updated', customer
            })
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

export default CustomerController
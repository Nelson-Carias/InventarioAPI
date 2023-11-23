import {Request, Response} from "express"
import { AppDataSource } from "../data-source"
import { Rol } from "../models/Rol"
import { Like } from "typeorm"

const roleRepository = AppDataSource.getRepository(Rol) 
class RoleController {
    // static guardarRol

    static createRol = async (req:Request, res:Response) => {  
        const {rol} = req.body
        try{
            //instancia
            const role = new Rol()
            role.rol = rol

            await roleRepository.save(role)
            return res.json({
                ok: true,
                StatusCode: 200,
                message: `Rol was create`
            })
        }
        catch(error){
            Ok: false
            StatusCode: 500
            message: `error = ${error.message}`
        }
    }

    static getRoles = async (req:Request, res:Response)=> {
        const name = req.query.name || ""
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10
        
        console.log(req.query)
        try{

            const skip = (page - 1) * limit;
            const roles = await roleRepository.find({
                where: { state: true, rol: Like(`%${name}%`) },
                skip,
                take: limit,
      });
            return roles.length > 0 ? res.json({ok:true, roles, page, limit, totalRoles: roles.length }) : res.json({ok:false, msg: "Not found"})
        }
        catch(error){
            ok: false
            StatusCode: 500
            message: `error = ${error.message}`
        }
    }

    static byIdRol = async (req:Request, res:Response) => {
        const id = parseInt(req.params.id)
        try{
            const rol = await roleRepository.findOne({where:{id, state:true}})
            return rol ? res.json({ok:true, rol}) : res.json({ok:false, msg: "Not found"})
        }catch(error){
            ok: false
            StatusCode: 500
            message: `error = ${error.message}`
        }

    } 

    static deleteRol = async (req:Request, res:Response) => {
        const id = parseInt(req.params.id)
        try{
            const rol = await roleRepository.findOne({where:{id, state:true}})
            if(!rol){
                return res.json({
                    ok: false,
                    StatusCode: 404,
                    message: `Not found`
                })
            }

            rol.state = false;
            await roleRepository.save(rol)
            return res.json({
                ok: true,
                StatusCode: 200,
                message: `Rol was delete`
            })
        }catch(error){
            ok: false
            StatusCode: 500
            message: `error = ${error.message}`
        }

    }

    static updateRol = async (req:Request, res:Response) => {
        const id = parseInt(req.params.id)
        const {rol} = req.body
        let role:Rol
        try{   
            role = await roleRepository.findOne({where:{id, state:true}})
            if(!rol){
                return res.json({
                    ok: false,
                    StatusCode: 404,
                    message: `Not found`
                })
            }

            role.rol = rol
            await roleRepository.save(role)
            return res.json({
                ok: true,
                EstatusCode: 200,
                message: `Upadate Rol`
            })
        }catch(error){
            ok: false
            StatusCode: 500
            message: `error = ${error.message}`
        }
    }
}


export default RoleController
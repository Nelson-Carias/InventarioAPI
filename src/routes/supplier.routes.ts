import { Supplier } from './../models/Supplier';
import {} from 'express'
import {Router} from 'express'
import SupplierController from '../controllers/supplier.controller'
import { checkToken } from '../jwtvalidation/jwt.validation'
const router = Router()
const supplier = SupplierController

router.post("/",  supplier.createSupplier)
router.get('/',  supplier.getSuppliers)
router.get('/:id',  supplier.byIdSupplier)
router.delete('/:id',  supplier.deleteSupplier)
router.put('/:id',  supplier.updateSupplier)

export default router
import { Supplier } from './../models/Supplier';
import {} from 'express'
import {Router} from 'express'
import SupplierController from '../controllers/supplier.controller'
import { checkToken } from '../jwtvalidation/jwt.validation'
const router = Router()
const supplier = SupplierController

router.post("/", checkToken, supplier.createSupplier)
router.get('/', checkToken, supplier.getSuppliers)
router.get('/:id', checkToken,  supplier.byIdSupplier)
router.delete('/:id', checkToken,  supplier.deleteSupplier)
router.put('/:id', checkToken,  supplier.updateSupplier)

export default router
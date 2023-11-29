import {} from 'express'
import {Router} from 'express'
import ProveedorController from '../controllers/supplier.controller'
import { checkToken } from '../jwtvalidation/jwt.validation'
const router = Router()
const proveedor = ProveedorController

router.post("/", checkToken,  proveedor.createSupplier)
router.get('/', checkToken,  proveedor.getSuppliers)
router.get('/:id',checkToken,  proveedor.byIdSupplier)
router.delete('/:id', checkToken, proveedor.deleteSupplier)
router.put('/:id', checkToken,  proveedor.updateSupplier)

export default router
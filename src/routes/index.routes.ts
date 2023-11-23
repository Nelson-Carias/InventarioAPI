import { Router } from 'express';
import dotenv from 'dotenv'
import routerProduct from './product.routes'
import routerSupplier from './supplier.routes'
import routerRole from './role.routes'
import routerUser from './user.routes'
import routerSale from './sale.routes'
import routerSaleDetail from './saleDetail.routes'
import routerCustomer from './customer.routes'
import routerAuth from './auth.routes'


dotenv.config()

const URL = process.env.url  

const routes = Router()
 
routes.use(`${URL}/supplier`, routerSupplier)
routes.use(`${URL}/product`, routerProduct)
routes.use(`${URL}/rol`, routerRole)
routes.use(`${URL}/user`, routerUser)
routes.use(`${URL}/sale`, routerSale)
routes.use(`${URL}/saleDetail`, routerSaleDetail)
routes.use(`${URL}/customer`, routerCustomer)
routes.use(`${URL}/login`, routerAuth)

export default routes
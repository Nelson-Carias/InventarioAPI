import {Router} from "express"
import RolController from "../controllers/role.controller"
import { checkToken } from "../jwtvalidation/jwt.validation";
const router = Router();

const rol =  RolController

router.post("/",   rol.createRol)

router.get("/",  rol.getRoles)

router.get("/:id", rol.byIdRol)

router.put("/:id",   rol.updateRol)

router.delete("/:id",   rol.deleteRol)


export default router

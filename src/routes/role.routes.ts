import {Router} from "express"
import RolController from "../controllers/role.controller"
import { checkToken } from "../jwtvalidation/jwt.validation";
const router = Router();

const rol =  RolController

router.post("/",  rol.createRol)

router.get("/",  rol.getRoles)

router.get("/:id", checkToken, rol.byIdRol)

router.put("/:id", checkToken,  rol.updateRol)

router.delete("/:id", checkToken,  rol.deleteRol)


export default router
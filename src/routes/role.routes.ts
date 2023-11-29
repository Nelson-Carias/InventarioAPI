import {Router} from "express"
import RolController from "../controllers/role.controller"
import { checkToken } from "../jwtvalidation/jwt.validation";
const router = Router();

const rol =  RolController

router.post("/", checkToken, rol.createRol)

router.get("/", checkToken, rol.getRoles)

router.get("/:id", checkToken, rol.byIdRol)

router.delete("/:id", checkToken,  rol.deleteRol)

router.put("/:id", checkToken,  rol.updateRol)

export default router
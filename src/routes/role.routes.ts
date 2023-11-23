import {Router} from "express"
import RolController from "../controllers/role.controller"

const router = Router();

const rol =  RolController

router.post("/", rol.createRol)

router.get("/", rol.getRoles)

router.get("/:id", rol.byIdRol)

router.delete("/:id", rol.deleteRol)

router.put("/:id", rol.updateRol)

export default router
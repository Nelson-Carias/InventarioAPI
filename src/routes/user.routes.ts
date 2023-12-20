import { Router } from "express";
import UsersController from "../controllers/users.controller";
import { checkToken } from "../jwtvalidation/jwt.validation";

const router = Router();

const user = UsersController

router.post("/",  user.createUser)

router.get("/",  user.getUsers)

router.get("/:id", user.byIdUser)

router.delete("/:id",  user.deleteUser)

router.put("/:id",  user.updateUser)

export default router
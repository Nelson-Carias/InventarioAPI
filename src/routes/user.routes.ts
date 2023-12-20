import { Router } from "express";
import UsersController from "../controllers/users.controller";
import { checkToken } from "../jwtvalidation/jwt.validation";

const router = Router();

const user = UsersController

router.post("/", checkToken, user.createUser)

router.get("/", checkToken, user.getUsers)

router.get("/:id", checkToken, user.byIdUser)

router.delete("/:id", checkToken, user.deleteUser)

router.put("/:id", checkToken, user.updateUser)

export default router
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
const jwt_validation_1 = require("../jwtvalidation/jwt.validation");
const router = (0, express_1.Router)();
const user = users_controller_1.default;
router.post("/", jwt_validation_1.checkToken, user.createUser);
router.get("/", jwt_validation_1.checkToken, user.getUsers);
router.get("/:id", jwt_validation_1.checkToken, user.byIdUser);
router.delete("/:id", jwt_validation_1.checkToken, user.deleteUser);
router.put("/:id", jwt_validation_1.checkToken, user.updateUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map
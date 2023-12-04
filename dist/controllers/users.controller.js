"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const User_1 = require("../models/User");
const Rol_1 = require("../models/Rol");
const typeorm_1 = require("typeorm");
//Method by get
class UsersController {
}
_a = UsersController;
// save
UsersController.createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastName, email, password, rolId } = req.body;
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    const roleRepository = data_source_1.AppDataSource.getRepository(Rol_1.Rol);
    let existingRol;
    try {
        const userExist = yield userRepository.findOne({ where: { email } });
        if (userExist) {
            return res.json({ ok: false, msg: `Email '${email}' already exists` });
        }
        if (rolId) {
            existingRol = yield roleRepository.findOne({ where: { id: rolId } });
            if (!existingRol) {
                return res.json({
                    ok: false,
                    msg: `Role with ID '${rolId}' does not exist`,
                });
            }
        }
        else {
            if ((existingRol === null || existingRol === void 0 ? void 0 : existingRol.rol) && rolId) {
                return res.json({
                    ok: false,
                    msg: 'Cannot assing rol to a regular user'
                });
            }
        }
        const user = new User_1.User();
        user.name = name;
        user.lastName = lastName;
        user.email = email;
        user.password = password;
        user.hashPassword();
        const savedUser = yield userRepository.save(user);
        savedUser.password = undefined;
        user.rol = existingRol;
        yield userRepository.save(user);
        return res.json({
            ok: true,
            msg: 'User was create',
        });
    }
    catch (error) {
        return res.json({
            ok: false,
            msg: `Error => ${error}`,
        });
    }
});
UsersController.getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    try {
        const users = yield userRepository.find({
            where: { state: true }, relations: { rol: true },
        });
        return users.length > 0
            ? res.json({
                ok: true,
                msg: 'list of users',
                users
            }) : res.json({ ok: false, msg: 'data not found', users });
    }
    catch (error) {
        return res.json({
            ok: false,
            msg: `Error => ${error}`,
        });
    }
});
// by-Id
UsersController.byIdUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    try {
        const user = yield userRepository.findOne({
            where: { id, state: true },
        });
        // if (!user) {
        //     throw new Error('This user don exist in data base')
        // }
        return user
            ? res.json({ ok: true, user, msg: 'success' })
            : res.json({ ok: false, msg: "The id dont exist" });
    }
    catch (e) {
        return res.json({
            ok: false,
            msg: `Server error => ${e}`,
        });
    }
});
// update 
UsersController.updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    const roleRepository = data_source_1.AppDataSource.getRepository(Rol_1.Rol);
    const { name, lastName, email, password, rolId } = req.body;
    let user;
    try {
        user = yield userRepository.findOneOrFail({
            where: { id, state: true },
        });
        if (!user) {
            throw new Error('User does not exist in the database');
        }
        const existingUser = yield userRepository.findOne({
            where: { email, id: (0, typeorm_1.Not)(id) },
        });
        if (existingUser) {
            return res.json({
                ok: false,
                msg: `Email '${email}' already exists`,
            });
        }
        const existingRol = yield roleRepository.findOne({ where: { id: rolId } });
        if (!existingRol) {
            return res.json({
                ok: false,
                msg: `Role with ID '${rolId}' does not exist`,
            });
        }
        user.name = name;
        user.lastName = lastName;
        user.email = email;
        user.password = password;
        user.hashPassword();
        const savedUser = yield userRepository.save(user);
        savedUser.password = undefined;
        user.rol = existingRol;
        yield userRepository.save(user);
        return res.json({
            ok: true,
            msg: 'User  updated',
            user: user,
        });
    }
    catch (error) {
        return res.json({
            ok: false,
            msg: `Error -> ${error}`,
        });
    }
});
// delete
UsersController.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    try {
        const user = yield userRepository.findOne({
            where: { id, state: true },
        });
        if (!user) {
            throw new Error("User dont exist in data base");
        }
        user.state = false;
        yield userRepository.save(user);
        return res.json({
            ok: true,
            msg: "User was delete",
        });
    }
    catch (e) {
        return res.json({
            ok: false,
            msg: `Server error => ${e}`,
        });
    }
});
exports.default = UsersController;
//# sourceMappingURL=users.controller.js.map
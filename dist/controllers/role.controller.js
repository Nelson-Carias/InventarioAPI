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
const Rol_1 = require("../models/Rol");
const typeorm_1 = require("typeorm");
const roleRepository = data_source_1.AppDataSource.getRepository(Rol_1.Rol);
class RoleController {
}
_a = RoleController;
// static guardarRol
RoleController.createRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rol } = req.body;
    try {
        //instancia
        const role = new Rol_1.Rol();
        role.rol = rol;
        yield roleRepository.save(role);
        return res.json({
            ok: true,
            StatusCode: 200,
            message: `Rol was create`
        });
    }
    catch (error) {
        Ok: false;
        StatusCode: 500;
        message: `error = ${error.message}`;
    }
});
RoleController.getRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.query.name || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    console.log(req.query);
    try {
        const [roles, total] = yield roleRepository.findAndCount({
            where: { state: true, rol: (0, typeorm_1.Like)(`%${name}%`) },
            order: { rol: 'ASC' },
            skip: (page - 1) * limit,
            take: limit,
        });
        let totalPag = Number(total) / limit;
        if (totalPag % 1 !== 0) {
            totalPag = Math.trunc(totalPag) + 1;
        }
        let nextPag = page >= totalPag ? page : Number(page) + 1;
        let prevPag = page <= 1 ? page : page - 1;
        return res.json({
            ok: true,
            roles,
            total,
            totalPag,
            currentPag: Number(page),
            nextPag,
            prevPag,
        });
    }
    catch (error) {
        ok: false;
        StatusCode: 500;
        message: `error = ${error.message}`;
    }
});
RoleController.byIdRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const rol = yield roleRepository.findOne({ where: { id, state: true } });
        return rol ? res.json({ ok: true, rol }) : res.json({ ok: false, msg: "Not found" });
    }
    catch (error) {
        ok: false;
        StatusCode: 500;
        message: `error = ${error.message}`;
    }
});
RoleController.deleteRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const rol = yield roleRepository.findOne({ where: { id, state: true } });
        if (!rol) {
            return res.json({
                ok: false,
                StatusCode: 404,
                message: `Not found`
            });
        }
        rol.state = false;
        yield roleRepository.save(rol);
        return res.json({
            ok: true,
            StatusCode: 200,
            message: `Rol was delete`
        });
    }
    catch (error) {
        ok: false;
        StatusCode: 500;
        message: `error = ${error.message}`;
    }
});
RoleController.updateRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { rol } = req.body;
    let role;
    try {
        role = yield roleRepository.findOne({ where: { id, state: true } });
        if (!rol) {
            return res.json({
                ok: false,
                StatusCode: 404,
                message: `Not found`
            });
        }
        role.rol = rol;
        yield roleRepository.save(role);
        return res.json({
            ok: true,
            EstatusCode: 200,
            message: `Upadate Rol`
        });
    }
    catch (error) {
        ok: false;
        StatusCode: 500;
        message: `error = ${error.message}`;
    }
});
exports.default = RoleController;
//# sourceMappingURL=role.controller.js.map
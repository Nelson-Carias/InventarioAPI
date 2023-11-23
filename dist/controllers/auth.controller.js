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
const data_source_1 = require("./../data-source");
const User_1 = require("../models/User");
class AuthController {
}
_a = AuthController;
AuthController.loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    try {
        const user = yield userRepository.findOne({ where: { email } });
        if (!user || user.password !== password) {
            return res.json({
                ok: false,
                StatusCode: 404,
                message: 'email or password does not exist'
            });
        }
        return res.json({
            ok: true,
            msg: 'Login successful',
        });
    }
    catch (error) {
        return res.json({
            ok: false,
            message: `error = ${error}`,
        });
    }
});
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map
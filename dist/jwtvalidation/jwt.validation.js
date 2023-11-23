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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = exports.Token = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Token = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
    }, process.env.TOKEN_KEY, {
        expiresIn: "24h",
    });
});
exports.Token = Token;
const checkToken = (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
        // Remove Bearer from string
        token = token.slice(7);
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
            if (err) {
                res.json({
                    success: 0,
                    message: "Invalid Token..."
                });
            }
            else {
                next();
            }
        });
    }
    else {
        res.json({
            success: 0,
            message: "Access Denied! Unauthorized User"
        });
    }
};
exports.checkToken = checkToken;
// export const ValidateToken = async (token: string) => {
//   try {
//     return jwt.verify(token, process.env.TOKEN_KEY);
//   } catch (error) {
//     null;
//   }
// };
//# sourceMappingURL=jwt.validation.js.map
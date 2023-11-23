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
require("reflect-metadata");
const server_js_1 = __importDefault(require("./server/server.js"));
const dotenv_1 = __importDefault(require("dotenv"));
const data_source_1 = require("./data-source");
dotenv_1.default.config();
const server = new server_js_1.default();
server.listen();
// esto es una promesa
data_source_1.AppDataSource.initialize().then((conection) => __awaiter(void 0, void 0, void 0, function* () {
    if (conection) {
        console.log(`==> Conection with data base successfully <==`);
    }
})).catch((error) => console.log(error + 'Conection database failed') + error);
//# sourceMappingURL=index.js.map
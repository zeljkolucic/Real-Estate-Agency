"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ponuda_controller_1 = require("../controllers/ponuda.controller");
const ponudaRouter = express_1.default.Router();
ponudaRouter.route('/dodajPonudu').post((req, res) => new ponuda_controller_1.PonudaController().dodajPonudu(req, res));
exports.default = ponudaRouter;
//# sourceMappingURL=ponuda.routes.js.map
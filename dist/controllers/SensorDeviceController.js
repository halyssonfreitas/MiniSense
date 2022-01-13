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
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status");
const SensorDeviceService_1 = require("../services/SensorDeviceService");
const Helper_1 = require("../infra/Helper");
class SensorDeviceController {
    get(req, res) {
        SensorDeviceService_1.default.get()
            .then(news => Helper_1.default.sendResponse(res, HttpStatus.OK, news))
            .catch(error => console.error.bind(console, `NewsController - get() : ${error}`));
    }
    getById(req, res) {
        const _id = req.params.id;
        SensorDeviceService_1.default.getById(_id)
            .then(news => Helper_1.default.sendResponse(res, HttpStatus.OK, news))
            .catch(error => console.error.bind(console, `NewsController - get() : ${error}`));
    }
    create(req, res) {
        let sd = req.body;
        SensorDeviceService_1.default.create(sd)
            .then(function (sd) {
            return __awaiter(this, void 0, void 0, function* () {
                yield Helper_1.default.sendResponse(res, HttpStatus.OK, sd);
            });
        })
            .catch(error => {
            console.log(`SensorDevice - create() : ${error}`);
            Helper_1.default.sendResponse(res, HttpStatus.OK, { "error": `${error}` });
        });
    }
    update(req, res) {
        const _id = req.params.id;
        let news = req.body;
        SensorDeviceService_1.default.update(_id, news)
            .then(news => Helper_1.default.sendResponse(res, HttpStatus.OK, "Notícia atualizada com sucesso!"))
            .catch(error => console.error.bind(console, `NewsController - update() : ${error}`));
    }
    delete(req, res) {
        const _id = req.params.id;
        SensorDeviceService_1.default.delete(_id)
            .then(news => Helper_1.default.sendResponse(res, HttpStatus.OK, "Notícia deletada com sucesso!"))
            .catch(error => console.error.bind(console, `NewsController - delete() : ${error}`));
    }
}
exports.default = new SensorDeviceController();

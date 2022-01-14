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
const DataStreamService_1 = require("../services/DataStreamService");
const Helper_1 = require("../infra/Helper");
class DataStreamController {
    get(req, res) {
        DataStreamService_1.default.get()
            .then(data => Helper_1.default.sendResponse(res, HttpStatus.OK, data))
            .catch(error => console.error.bind(console, `DataStreamController - get() : ${error}`));
    }
    getById(req, res) {
        const id = req.params.id;
        DataStreamService_1.default.getByIdRoute(id)
            .then(ds => Helper_1.default.sendResponse(res, HttpStatus.OK, ds))
            .catch(error => {
            console.log(`DataStream - getById() : ${error}`);
            Helper_1.default.sendResponse(res, HttpStatus.OK, { "error": `${error}` });
        });
    }
    create(req, res) {
        let ds = req.body;
        let sd = req.params.sensorDevice;
        DataStreamService_1.default.create(ds, sd)
            .then((ds) => __awaiter(this, void 0, void 0, function* () {
            yield Helper_1.default.sendResponse(res, HttpStatus.OK, ds);
        }))
            .catch(error => {
            console.log(`DataStream - create() : ${error}`);
            Helper_1.default.sendResponse(res, HttpStatus.OK, { "error": `${error}` });
        });
    }
    update(req, res) {
        const _id = req.params.id;
        let news = req.body;
        DataStreamService_1.default.update(_id, news)
            .then(news => Helper_1.default.sendResponse(res, HttpStatus.OK, "DataStream atualizado com sucesso!"))
            .catch(error => console.error.bind(console, `DataStreamController - update() : ${error}`));
    }
    delete(req, res) {
        const _id = req.params.id;
        DataStreamService_1.default.delete(_id)
            .then(news => Helper_1.default.sendResponse(res, HttpStatus.OK, "DataStream deletado com sucesso!"))
            .catch(error => console.error.bind(console, `DataStreamController - delete() : ${error}`));
    }
}
exports.default = new DataStreamController();

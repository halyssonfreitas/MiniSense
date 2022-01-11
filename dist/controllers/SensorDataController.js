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
const SensorDataService_1 = require("../services/SensorDataService");
const DataStreamService_1 = require("../services/DataStreamService");
const Helper_1 = require("../infra/Helper");
class SensorDataController {
    get(req, res) {
        SensorDataService_1.default.get()
            .then(news => Helper_1.default.sendResponse(res, HttpStatus.OK, news))
            .catch(error => console.error.bind(console, `NewsController - get() : ${error}`));
    }
    getById(req, res) {
        const _id = req.params.id;
        SensorDataService_1.default.getById(_id)
            .then(news => Helper_1.default.sendResponse(res, HttpStatus.OK, news))
            .catch(error => console.error.bind(console, `NewsController - get() : ${error}`));
    }
    create(req, res) {
        let sd = req.body;
        let id = req.body.DataStream;
        SensorDataService_1.default.create(sd)
            // TO-DO refazer retornando o id da news
            .then((sd) => __awaiter(this, void 0, void 0, function* () {
            let ds = yield DataStreamService_1.default.getById(id);
            // dssd - Adivindo de DataStreamService a lista de SensorData
            let dssd = [sd._id.toString()];
            ds.SensorDatas.map((x) => __awaiter(this, void 0, void 0, function* () {
                dssd.push(x.toString());
            }));
            yield DataStreamService_1.default.update(id, { SensorDatas: dssd });
            console.log("CHEGOU AQUI");
            yield Helper_1.default.sendResponse(res, HttpStatus.OK, "SensorData cadastrado com sucesso!");
        }))
            .catch(error => console.error.bind(console, `SensorDataController - create() : ${error}`));
    }
    update(req, res) {
        const _id = req.params.id;
        let news = req.body;
        SensorDataService_1.default.update(_id, news)
            .then(news => Helper_1.default.sendResponse(res, HttpStatus.OK, "Notícia atualizada com sucesso!"))
            .catch(error => console.error.bind(console, `NewsController - update() : ${error}`));
    }
    delete(req, res) {
        const _id = req.params.id;
        SensorDataService_1.default.delete(_id)
            .then(news => Helper_1.default.sendResponse(res, HttpStatus.OK, "Notícia deletada com sucesso!"))
            .catch(error => console.error.bind(console, `NewsController - delete() : ${error}`));
    }
}
exports.default = new SensorDataController();

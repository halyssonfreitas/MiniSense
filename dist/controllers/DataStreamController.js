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
const SensorDeviceService_1 = require("../services/SensorDeviceService");
const Helper_1 = require("../infra/Helper");
class DataStreamController {
    get(req, res) {
        DataStreamService_1.default.get()
            .then(data => Helper_1.default.sendResponse(res, HttpStatus.OK, data))
            .catch(error => console.error.bind(console, `NewsController - get() : ${error}`));
    }
    getById(req, res) {
        const _id = req.params.id;
        DataStreamService_1.default.getById(_id)
            .then(data => Helper_1.default.sendResponse(res, HttpStatus.OK, data))
            .catch(error => console.error.bind(console, `NewsController - get() : ${error}`));
    }
    create(req, res) {
        let ds = req.body;
        let id = req.body.SensorDevice;
        DataStreamService_1.default.create(ds)
            // TO-DO refazer retornando o id da news
            .then((ds) => __awaiter(this, void 0, void 0, function* () {
            let sd = yield SensorDeviceService_1.default.getById(id);
            // sdds - Adivindo de SensorDeviceService a lista de DataStream
            let sdds = [ds._id.toString()];
            sd.DataStreams.map((x) => __awaiter(this, void 0, void 0, function* () {
                sdds.push(x.toString());
            }));
            yield SensorDeviceService_1.default.update(id, { DataStreams: sdds });
            yield Helper_1.default.sendResponse(res, HttpStatus.OK, "Notícia cadastrada com sucesso!");
        }))
            .catch(error => console.error.bind(console, `NewsController - create() : ${error}`));
    }
    update(req, res) {
        const _id = req.params.id;
        let news = req.body;
        DataStreamService_1.default.update(_id, news)
            .then(news => Helper_1.default.sendResponse(res, HttpStatus.OK, "Notícia atualizada com sucesso!"))
            .catch(error => console.error.bind(console, `NewsController - update() : ${error}`));
    }
    delete(req, res) {
        const _id = req.params.id;
        DataStreamService_1.default.delete(_id)
            .then(news => Helper_1.default.sendResponse(res, HttpStatus.OK, "Notícia deletada com sucesso!"))
            .catch(error => console.error.bind(console, `NewsController - delete() : ${error}`));
    }
}
exports.default = new DataStreamController();

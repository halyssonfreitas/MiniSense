"use strict";
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
        let news = req.body;
        SensorDeviceService_1.default.create(news)
            // TO-DO refazer retornando o id da news
            .then(news => Helper_1.default.sendResponse(res, HttpStatus.OK, "Notícia cadastrada com sucesso!"))
            .catch(error => console.error.bind(console, `NewsController - create() : ${error}`));
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

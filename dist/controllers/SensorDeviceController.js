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
const UserService_1 = require("../services/UserService");
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
        let id = req.body.User;
        //console.log("SensorDeviceController - create() : " + user); // funcionou
        SensorDeviceService_1.default.create(sd)
            // TO-DO refazer retornando o id da sd
            .then((sd) => __awaiter(this, void 0, void 0, function* () {
            // pega o user que o SensorDevice se referência em seu cadastro
            let user = yield UserService_1.default.getById(id);
            //console.log("SensorDevice - create() : user :" + user)
            // inicia um novo array que vai compor o user.SensorDevices
            let usd = [sd._id.toString()];
            // pega os itens já existente em user.SensorDevices para o novo array
            user.SensorDevices.map((dev) => __awaiter(this, void 0, void 0, function* () {
                usd.push(dev.toString());
            }));
            //console.log(usd)
            // seta o novo array dentro do user
            yield UserService_1.default.update(id, { SensorDevices: usd });
            yield Helper_1.default.sendResponse(res, HttpStatus.OK, "SensorDevice cadastrado com sucesso!");
        }))
            .catch(error => console.error.bind(console, `SensorDevice - create() : ${error}`));
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

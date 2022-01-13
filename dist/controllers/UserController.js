"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status");
const UserService_1 = require("../services/UserService");
const Helper_1 = require("../infra/Helper");
class UserController {
    get(req, res) {
        UserService_1.default.get()
            .then(news => Helper_1.default.sendResponse(res, HttpStatus.OK, news))
            .catch(error => console.error.bind(console, `NewsController - get() : ${error}`));
    }
    getById(req, res) {
        const _id = req.params.id;
        UserService_1.default.getById(_id)
            .then(news => Helper_1.default.sendResponse(res, HttpStatus.OK, news))
            .catch(error => console.error.bind(console, `NewsController - get() : ${error}`));
    }
    create(req, res) {
        let user = req.body;
        UserService_1.default.create(user)
            .then(user => Helper_1.default.sendResponse(res, HttpStatus.OK, user))
            .catch(error => {
            console.log(`User - create() : ${error}`);
            Helper_1.default.sendResponse(res, HttpStatus.OK, { "error": `${error}` });
        });
    }
    update(req, res) {
        const _id = req.params.id;
        let news = req.body;
        UserService_1.default.update(_id, news)
            .then(news => Helper_1.default.sendResponse(res, HttpStatus.OK, "Notícia atualizada com sucesso!"))
            .catch(error => console.error.bind(console, `NewsController - update() : ${error}`));
    }
    delete(req, res) {
        const _id = req.params.id;
        UserService_1.default.delete(_id)
            .then(news => Helper_1.default.sendResponse(res, HttpStatus.OK, "Notícia deletada com sucesso!"))
            .catch(error => console.error.bind(console, `NewsController - delete() : ${error}`));
    }
}
exports.default = new UserController();

import * as HttpStatus from "http-status";

import UserService from "../services/UserService";
import Helper from "../infra/Helper";


class UserController {

    get(req, res) {
        UserService.get()
        .then(news => Helper.sendResponse(res, HttpStatus.OK, news))
        .catch(error => console.error.bind(console, `NewsController - get() : ${error}`))
    
    }
    getById(req, res) {
        const _id = req.params.id;
        UserService.getById(_id)
        .then(news => Helper.sendResponse(res, HttpStatus.OK, news))
        .catch(error => console.error.bind(console, `NewsController - get() : ${error}`))
    }
    create(req, res) {
        let news = req.body;

        console.log("UserController - create() : " + news)

        UserService.create(news)
        // TO-DO refazer retornando o id da news
        .then(() => Helper.sendResponse(res, HttpStatus.OK, "Notícia cadastrada com sucesso!"))
        .catch(error => console.error.bind(console, `NewsController - create() : ${error}`))
    }
    update(req, res) {
        const _id = req.params.id
        let news = req.body

        UserService.update(_id, news)
        .then(news => Helper.sendResponse(res, HttpStatus.OK, "Notícia atualizada com sucesso!"))
        .catch(error => console.error.bind(console, `NewsController - update() : ${error}`))
    }
    delete(req, res) {
        const _id = req.params.id

        UserService.delete(_id)
        .then(news => Helper.sendResponse(res, HttpStatus.OK, "Notícia deletada com sucesso!"))
        .catch(error => console.error.bind(console, `NewsController - delete() : ${error}`))
    }

}

export default new UserController();
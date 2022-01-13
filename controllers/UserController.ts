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
        let user = req.body;

        UserService.create(user)
        .then(user => Helper.sendResponse(res, HttpStatus.OK, user))
        .catch(error => {
            console.log(`User - create() : ${error}`)
            Helper.sendResponse(res, HttpStatus.OK, { "error": `${error}` });
        })
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
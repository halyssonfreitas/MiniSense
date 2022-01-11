import * as HttpStatus from "http-status";

import SensorDataService from "../services/SensorDataService";
import Helper from "../infra/Helper";


class SensorDataController {

    get(req, res) {
        SensorDataService.get()
        .then(news => Helper.sendResponse(res, HttpStatus.OK, news))
        .catch(error => console.error.bind(console, `NewsController - get() : ${error}`))
    
    }
    getById(req, res) {
        const _id = req.params.id;
        SensorDataService.getById(_id)
        .then(news => Helper.sendResponse(res, HttpStatus.OK, news))
        .catch(error => console.error.bind(console, `NewsController - get() : ${error}`))
    }
    create(req, res) {
        let news = req.body;

        SensorDataService.create(news)
        // TO-DO refazer retornando o id da news
        .then(news => Helper.sendResponse(res, HttpStatus.OK, "Notícia cadastrada com sucesso!"))
        .catch(error => console.error.bind(console, `NewsController - create() : ${error}`))
    }
    update(req, res) {
        const _id = req.params.id
        let news = req.body

        SensorDataService.update(_id, news)
        .then(news => Helper.sendResponse(res, HttpStatus.OK, "Notícia atualizada com sucesso!"))
        .catch(error => console.error.bind(console, `NewsController - update() : ${error}`))
    }
    delete(req, res) {
        const _id = req.params.id

        SensorDataService.delete(_id)
        .then(news => Helper.sendResponse(res, HttpStatus.OK, "Notícia deletada com sucesso!"))
        .catch(error => console.error.bind(console, `NewsController - delete() : ${error}`))
    }

}

export default new SensorDataController();
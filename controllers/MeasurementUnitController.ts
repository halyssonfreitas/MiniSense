import * as HttpStatus from "http-status";

import MeasurementUnitService from "../services/MeasurementUnitService";
import Helper from "../infra/Helper";


class MeasurementUnitController {

    get(req, res) {
        MeasurementUnitService.get()
        .then(news => Helper.sendResponse(res, HttpStatus.OK, news))
        .catch(error => console.error.bind(console, `NewsController - get() : ${error}`))
    
    }
    getById(req, res) {
        const _id = req.params.id;
        MeasurementUnitService.getById(_id)
        .then(news => Helper.sendResponse(res, HttpStatus.OK, news))
        .catch(error => console.error.bind(console, `NewsController - get() : ${error}`))
    }
    create(req, res) {
        let news = req.body;

        MeasurementUnitService.create(news)
        // TO-DO refazer retornando o id da news
        .then(news => Helper.sendResponse(res, HttpStatus.OK, "Notícia cadastrada com sucesso!"))
        .catch(error => console.error.bind(console, `NewsController - create() : ${error}`))
    }
    update(req, res) {
        const _id = req.params.id
        let news = req.body

        MeasurementUnitService.update(_id, news)
        .then(news => Helper.sendResponse(res, HttpStatus.OK, "Notícia atualizada com sucesso!"))
        .catch(error => console.error.bind(console, `NewsController - update() : ${error}`))
    }
    delete(req, res) {
        const _id = req.params.id

        MeasurementUnitService.delete(_id)
        .then(news => Helper.sendResponse(res, HttpStatus.OK, "Notícia deletada com sucesso!"))
        .catch(error => console.error.bind(console, `NewsController - delete() : ${error}`))
    }

}

export default new MeasurementUnitController();
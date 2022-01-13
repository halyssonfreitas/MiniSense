import * as HttpStatus from "http-status";


import DataStreamService from "../services/DataStreamService";
import SensorDeviceService from "../services/SensorDeviceService";
import Helper from "../infra/Helper";


class DataStreamController {

    get(req, res) {
        DataStreamService.get()
        .then(data => Helper.sendResponse(res, HttpStatus.OK, data))
        .catch(error => console.error.bind(console, `NewsController - get() : ${error}`))
    
    }
    getById(req, res) {
        const _id = req.params.id;
        DataStreamService.getById(_id)
        .then(data => Helper.sendResponse(res, HttpStatus.OK, data))
        .catch(error => console.error.bind(console, `NewsController - get() : ${error}`))
    }
    create(req, res) {
        let ds = req.body;

        DataStreamService.create(ds)
        .then(async ds => {
            await Helper.sendResponse(res, HttpStatus.OK, ds)
        })
        .catch(error => {
            console.log(`DataStream - create() : ${error}`)
            Helper.sendResponse(res, HttpStatus.OK, { "error": `${error}` });
        })
    }
    update(req, res) {
        const _id = req.params.id
        let news = req.body

        DataStreamService.update(_id, news)
        .then(news => Helper.sendResponse(res, HttpStatus.OK, "Notícia atualizada com sucesso!"))
        .catch(error => console.error.bind(console, `NewsController - update() : ${error}`))
    }
    delete(req, res) {
        const _id = req.params.id

        DataStreamService.delete(_id)
        .then(news => Helper.sendResponse(res, HttpStatus.OK, "Notícia deletada com sucesso!"))
        .catch(error => console.error.bind(console, `NewsController - delete() : ${error}`))
    }

}

export default new DataStreamController();
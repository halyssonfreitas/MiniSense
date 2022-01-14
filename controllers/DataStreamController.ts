import * as HttpStatus from "http-status";


import DataStreamService from "../services/DataStreamService";
import SensorDeviceService from "../services/SensorDeviceService";
import Helper from "../infra/Helper";


class DataStreamController {

    get(req, res) {
        DataStreamService.get()
        .then(data => Helper.sendResponse(res, HttpStatus.OK, data))
        .catch(error => console.error.bind(console, `DataStreamController - get() : ${error}`))
    
    }
    getById(req, res) {
        const id = req.params.id;
        DataStreamService.getByIdRoute(id)
        .then(ds => Helper.sendResponse(res, HttpStatus.OK, ds))
        .catch(error => {
            console.log(`DataStream - getById() : ${error}`)
            Helper.sendResponse(res, HttpStatus.OK, { "error": `${error}` });
        })
    }
    create(req, res) {
        let ds = req.body;
        let sd = req.params.sensorDevice

        DataStreamService.create(ds, sd)
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
        .then(news => Helper.sendResponse(res, HttpStatus.OK, "DataStream atualizado com sucesso!"))
        .catch(error => console.error.bind(console, `DataStreamController - update() : ${error}`))
    }
    delete(req, res) {
        const _id = req.params.id

        DataStreamService.delete(_id)
        .then(news => Helper.sendResponse(res, HttpStatus.OK, "DataStream deletado com sucesso!"))
        .catch(error => console.error.bind(console, `DataStreamController - delete() : ${error}`))
    }

}

export default new DataStreamController();
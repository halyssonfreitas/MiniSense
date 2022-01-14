import * as HttpStatus from "http-status";
import * as mongoose from "mongoose";

import SensorDeviceService from "../services/SensorDeviceService";
import UserService from "../services/UserService";
import Helper from "../infra/Helper";


class SensorDeviceController {

    get(req, res) {
        SensorDeviceService.get()
            .then(news => Helper.sendResponse(res, HttpStatus.OK, news))
            .catch(error => console.error.bind(console, `NewsController - get() : ${error}`))

    }
    getById(req, res) {
        const id = req.params.id;
        SensorDeviceService.getByUser(id)
            .then(sd => Helper.sendResponse(res, HttpStatus.OK, sd))
            .catch(error => {
                console.log(`SensorDevice - getById() : ${error}`)
                Helper.sendResponse(res, HttpStatus.OK, { "error": `${error}` });
            })
    }
    getByUser(req, res) {
        const user = req.params.user;
        SensorDeviceService.getByUser(user)
            .then(news => Helper.sendResponse(res, HttpStatus.OK, news))
            .catch(error => {
                console.log(`SensorDevice - getById() : ${error}`)
                Helper.sendResponse(res, HttpStatus.OK, { "error": `${error}` });
            })

    }
    create(req, res) {
        let sd = req.body;

        SensorDeviceService.create(sd)
            .then(async function (sd) {
                await Helper.sendResponse(res, HttpStatus.OK, sd);
            })
            .catch(error => {
                console.log(`SensorDevice - create() : ${error}`)
                Helper.sendResponse(res, HttpStatus.OK, { "error": `${error}` });
            })
    }
    update(req, res) {
        const _id = req.params.id
        let news = req.body

        SensorDeviceService.update(_id, news)
            .then(news => Helper.sendResponse(res, HttpStatus.OK, "Notícia atualizada com sucesso!"))
            .catch(error => console.error.bind(console, `NewsController - update() : ${error}`))
    }
    delete(req, res) {
        const _id = req.params.id

        SensorDeviceService.delete(_id)
            .then(news => Helper.sendResponse(res, HttpStatus.OK, "Notícia deletada com sucesso!"))
            .catch(error => console.error.bind(console, `NewsController - delete() : ${error}`))
    }

}

export default new SensorDeviceController();
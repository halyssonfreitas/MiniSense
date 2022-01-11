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
        const _id = req.params.id;
        SensorDeviceService.getById(_id)
        .then(news => Helper.sendResponse(res, HttpStatus.OK, news))
        .catch(error => console.error.bind(console, `NewsController - get() : ${error}`))
    }
    create(req, res) {
        let sd = req.body;
        let id = req.body.User;

        //console.log("SensorDeviceController - create() : " + user); // funcionou

        SensorDeviceService.create(sd)
        // TO-DO refazer retornando o id da sd
        .then(async sd => {
            // pega o user que o SensorDevice se referência em seu cadastro
            let user = await UserService.getById(id)
            //console.log("SensorDevice - create() : user :" + user)
            // inicia um novo array que vai compor o user.SensorDevices
            let usd = [sd._id.toString()]
            // pega os itens já existente em user.SensorDevices para o novo array
            user.SensorDevices.map(async dev => {
                usd.push(dev.toString())
            })
            //console.log(usd)
            // seta o novo array dentro do user
            await UserService.update(id, {SensorDevices: usd})
            await Helper.sendResponse(res, HttpStatus.OK, "SensorDevice cadastrado com sucesso!")
        })
        .catch(error => console.error.bind(console, `SensorDevice - create() : ${error}`))
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
import { uuid } from 'uuidv4'

import { ISensorDeviceDTO } from "../Interfaces/ISensorDeviceDTO";
import SensorDeviceRepository from "../repository/SensorDeviceRepository";
import DataStreamService from './DataStreamService';
import UserService from "./UserService";

class SensorDeviceService {
    get() {
        return SensorDeviceRepository.find({});
    }
    getById(_id) {
        return SensorDeviceRepository.findById(_id)
    }
    async getByUser(user) {
        let sensorDeviceListFull = await SensorDeviceRepository.find({}).populate(['DataStreams'])
        let sensorDeviceListUser = []

        for (let i=0; i < sensorDeviceListFull.length; i++){
            let sensorDevice = sensorDeviceListFull[i]
            if (sensorDevice.User.toString() === user) {
                let dataStreamList = []
                sensorDevice.DataStreams.map(dataStream => {
                    let y = {
                        id: dataStream._id,
                        key: dataStream.key,
                        label: dataStream.label,
                        unitId: dataStream.MeasurementUnit,
                        deviceId: dataStream.SensorDevice,
                        measurementCount: dataStream.SensorDatas.length
                    }
                    dataStreamList.push(y)
                })

                let x = {
                    id: sensorDevice._id,
                    key: sensorDevice.key,
                    label: sensorDevice.label,
                    description: sensorDevice.description,
                    streams: dataStreamList
                }
                sensorDeviceListUser.push(x)
            }
        }

        return sensorDeviceListUser
    }
    async create(sensorDeviceDTO: ISensorDeviceDTO) {
        sensorDeviceDTO.key = uuid()

        // pega o user que o SensorDevice se referência em seu cadastro
        let user = undefined
        if ((user = await UserService.getById(sensorDeviceDTO.User)) === null) {
            throw new Error("User doens't exist!")
        }

        const sensorDevice = await SensorDeviceRepository.create(sensorDeviceDTO);

        //console.log("SensorDevice - create() : user :" + user)
        // inicia um novo array que vai compor o user.SensorDevices
        let usd = [sensorDevice._id.toString()]
        // pega os itens já existente em user.SensorDevices para o novo array
        user.SensorDevices.map(dev => {
            usd.push(dev.toString())
        })
        //console.log(usd)
        // seta o novo array dentro do user
        await UserService.update(sensorDeviceDTO.User, { SensorDevices: usd })

        const sd = {
            "id": sensorDevice._id,
            "key": sensorDevice.key,
            "label": sensorDevice.label,
            "description": sensorDevice.description,
        }

        return sd

    }
    update(_id, dataStream) {
        return SensorDeviceRepository.findByIdAndUpdate(_id, dataStream)
    }
    delete(_id) {
        return SensorDeviceRepository.findByIdAndDelete(_id)
    }
}

export default new SensorDeviceService();
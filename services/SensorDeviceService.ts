import { uuid } from 'uuidv4'

import { ISensorDeviceDTO } from "../Interfaces/ISensorDeviceDTO";
import SensorDeviceRepository from "../repository/SensorDeviceRepository";
import DataStreamService from './DataStreamService';
import SensorDataService from './SensorDataService';
import UserService from "./UserService";

class SensorDeviceService {
    get() {
        return SensorDeviceRepository.find({});
    }
    getByIdSimple(_id) {
        return SensorDeviceRepository.findById(_id)
    }
    async getById(_id) {
        let sensorDevice = await SensorDeviceRepository.findById(_id).populate(['DataStreams'])

        let dataStreamList = []
        for (let i = 0; i < sensorDevice.DataStreams.length; i++) {
            let dataStream = sensorDevice.DataStreams[i]


            let sensorDataList = []
            let tam = null
            if (dataStream.SensorDatas.length > 5) { tam = 5 } else { tam = dataStream.SensorDatas.length }
            for (let j = 0; j < tam; j++) {
                let sensorDataId = dataStream.SensorDatas[j].toString()
                let sensorData = await SensorDataService.getById(sensorDataId)
                let y = {
                    timestamp: sensorData.timestamp,
                    value: sensorData.value
                }
                sensorDataList.push(y)
            }

            let x = {
                id: dataStream._id,
                key: dataStream.key,
                label: dataStream.label,
                unitId: dataStream.MeasurementUnit,
                deviceId: dataStream.SensorDevice,
                measurementCount: dataStream.SensorDatas.length,
                measurements: sensorDataList
            }
            dataStreamList.push(x)
        }

        let sd = {
            id: sensorDevice._id,
            key: sensorDevice.key,
            label: sensorDevice.label,
            description: sensorDevice.description,
            streams: dataStreamList
        }

        return sd
    }
    async getByUser(user) {
        let sensorDeviceListFull = await SensorDeviceRepository.find({}).populate(['DataStreams'])
        let sensorDeviceListUser = []

        for (let i = 0; i < sensorDeviceListFull.length; i++) {
            let sensorDevice = sensorDeviceListFull[i]
            if (sensorDevice.User.toString() === user) {
                let dataStreamList = []
                for (let i = 0; i < sensorDevice.DataStreams.length; i++) {
                    let dataStream = sensorDevice.DataStreams[i]
                    let y = {
                        id: dataStream._id,
                        key: dataStream.key,
                        label: dataStream.label,
                        unitId: dataStream.MeasurementUnit,
                        deviceId: dataStream.SensorDevice,
                        measurementCount: dataStream.SensorDatas.length
                    }
                    dataStreamList.push(y)
                }

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
    async create(sensorDeviceDTO: ISensorDeviceDTO, userP) {
        sensorDeviceDTO.key = uuid()
        sensorDeviceDTO.User = userP

        // pega o user que o SensorDevice se referência em seu cadastro
        let user = undefined
        if ((user = await UserService.getById(userP)) === null) {
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
        await UserService.update(userP, { SensorDevices: usd })

        const sd = {
            id: sensorDevice._id,
            key: sensorDevice.key,
            label: sensorDevice.label,
            description: sensorDevice.description,
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
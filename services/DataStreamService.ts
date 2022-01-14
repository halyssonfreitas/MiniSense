import { uuid } from 'uuidv4'

import { IDataStreamDTO } from "../Interfaces/IDataStreamDTO";
import MeasurementUnitSchema from "../models/MeasurementUnitSchema";
import DataStreamRepository from "../repository/DataStreamRepository";
import MeasurementUnitService from "./MeasurementUnitService";
import SensorDeviceService from "./SensorDeviceService";

class DataStreamService {
    get() {
        return DataStreamRepository.find({});
    }
    getById(_id) {
        return DataStreamRepository.findById(_id)
    }

    async getByIdRoute(_id) {

        let dataStream = await DataStreamRepository.findById(_id).populate(['SensorDatas'])

        let sensorDataList = []
        for (let i = 0; i < dataStream.SensorDatas.length; i++) {
            let sensorData = dataStream.SensorDatas[i]
            let x = {
                timestamp: sensorData.timestamp,
                value: sensorData.value
            }
            sensorDataList.push(x)
        }

        let ds = {
            id: dataStream._id,
            key: dataStream.key,
            label: dataStream.label,
            unitId: dataStream.MeasurementUnit,
            deviceId: dataStream.SensorDevice,
            measurementCount: dataStream.SensorDatas.length,
            measurements: sensorDataList
        }

        return ds
    }


    async create(dataStreamDTO: IDataStreamDTO, sensorDevice) {
        dataStreamDTO.SensorDevice = sensorDevice
        let sd = undefined
        if ((sd = await SensorDeviceService.getByIdSimple(dataStreamDTO.SensorDevice)) === null) {
            throw new Error("SensorDevice doens't exist!")
        }

        let mu = undefined
        if ((mu = await MeasurementUnitService.getById(dataStreamDTO.unitId)) === null) {
            throw new Error("MeasurementUnit doens't exist!")
        }

        let dataStream = await DataStreamRepository.create({
            key: uuid(),
            label: dataStreamDTO.label,
            enabled: false,
            SensorDevice: dataStreamDTO.SensorDevice,
            MeasurementUnit: dataStreamDTO.unitId,
            SensorDatas: [],
        })


        // sdds - Adivindo de SensorDeviceService a lista de DataStream
        let sdds = [dataStream._id.toString()]
        for (let i=0; i < sd.DataStreams.length; i++) {
            sdds.push(sd.DataStreams[i].toString())
        }
        await SensorDeviceService.update(dataStreamDTO.SensorDevice, { DataStreams: sdds })

        const ds = {
            "id": dataStream._id,
            "key": dataStream.key,
            "label": dataStream.label,
            "unitId": dataStream.MeasurementUnit,
            "deviceId": dataStream.SensorDevice,
            "measurementCount": dataStream.SensorDatas.length
        }


        return ds
    }
    update(_id, dataStream) {
        return DataStreamRepository.findByIdAndUpdate(_id, dataStream)
    }
    delete(_id) {
        return DataStreamRepository.findByIdAndDelete(_id)
    }
}

export default new DataStreamService();
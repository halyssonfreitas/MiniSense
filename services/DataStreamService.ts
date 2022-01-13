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
    async create(dataStreamDTO: IDataStreamDTO) {

        let sd = undefined
        try {
            sd = await SensorDeviceService.getById(dataStreamDTO.SensorDevice)
        } catch (error) {
            throw new Error("SensorDevice doens't exist!")
        }

        let mu = undefined
        try {
            mu = await MeasurementUnitService.getById(dataStreamDTO.unitId)
        } catch (error) {
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
        sd.DataStreams.map(async x => {
            sdds.push(x.toString())
        })
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
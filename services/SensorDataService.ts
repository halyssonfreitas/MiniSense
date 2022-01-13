import { ISensorDataDTO } from "../Interfaces/ISensorDataDTO";
import SensorDataRepository from "../repository/SensorDataRepository";
import DataStreamService from "./DataStreamService";

class SensorDataService {
    get() {
        return SensorDataRepository.find({});
    }
    getById(_id) {
        return SensorDataRepository.findById(_id)
    }
    async create(sensorDataDTO: ISensorDataDTO) {
        let ds = undefined
        console.log(sensorDataDTO)
        if ((ds = await DataStreamService.getById(sensorDataDTO.DataStream)) === null){
            throw new Error("DataStream doens't exist!")
        }
        let sensorData = await SensorDataRepository.create({
            timestamp: sensorDataDTO.timestamp,
            value: sensorDataDTO.value,
            MeasurementUnit: ds.MeasurementUnit,
            DataStream: ds._id.toString()
        })
        // dssd - Adivindo de DataStreamService a lista de SensorData
        let dssd = [sensorData._id.toString()]

        ds.SensorDatas.map(async x => {
            dssd.push(x.toString())
        })
        
        await DataStreamService.update(sensorDataDTO.DataStream, { SensorDatas: dssd })
        console.log("SensorDataService - create()")

        const sd = {
            "id": sensorData._id,
            "timestamp": sensorData.timestamp,
            "value": sensorData.value,
            "unitId": sensorData.MeasurementUnit
          }
          
        return sd
    }
    update(_id, dataStream) {
        return SensorDataRepository.findByIdAndUpdate(_id, dataStream)
    }
    delete(_id) {
        return SensorDataRepository.findByIdAndDelete(_id)
    }
}

export default new SensorDataService();
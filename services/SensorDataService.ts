import SensorDataRepository from "../repository/SensorDataRepository";

class SensorDataService {
    get() {
        return SensorDataRepository.find({});
    }
    getById(_id) {
        return SensorDataRepository.findById(_id)
    }
    create(dataStream) {
        return SensorDataRepository.create(dataStream)
    }
    update(_id, dataStream) {
        return SensorDataRepository.findByIdAndUpdate(_id, dataStream)
    }
    delete(_id) {
        return SensorDataRepository.findByIdAndDelete(_id)
    }
}

export default new SensorDataService();
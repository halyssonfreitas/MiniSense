import SensorDeviceRepository from "../repository/SensorDeviceRepository";

class SensorDeviceService {
    get() {
        return SensorDeviceRepository.find({});
    }
    getById(_id) {
        return SensorDeviceRepository.findById(_id)
    }
    create(dataStream) {
        return SensorDeviceRepository.create(dataStream)
    }
    update(_id, dataStream) {
        return SensorDeviceRepository.findByIdAndUpdate(_id, dataStream)
    }
    delete(_id) {
        return SensorDeviceRepository.findByIdAndDelete(_id)
    }
}

export default new SensorDeviceService();
import MeasurementUnitRepository from "../repository/MeasurementUnitRepository";

class MeasurementUnitService {
    get() {
        return MeasurementUnitRepository.find({});
    }
    getById(_id) {
        return MeasurementUnitRepository.findById(_id)
    }
    create(dataStream) {
        return MeasurementUnitRepository.create(dataStream)
    }
    update(_id, dataStream) {
        return MeasurementUnitRepository.findByIdAndUpdate(_id, dataStream)
    }
    delete(_id) {
        return MeasurementUnitRepository.findByIdAndDelete(_id)
    }
}

export default new MeasurementUnitService();
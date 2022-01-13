import MeasurementUnitRepository from "../repository/MeasurementUnitRepository";

class MeasurementUnitService {
    get() {
        return MeasurementUnitRepository.find({});
    }
    getById(_id) {
        return MeasurementUnitRepository.findById(_id)
    }
    async create(measurementUnitDTO) {
        let measurementUnit = await MeasurementUnitRepository.create(measurementUnitDTO)
        let mu = {
            id : measurementUnit.id,
            symbol : measurementUnit.symbol,
            description : measurementUnit.description
        }
        return mu
    }
    update(_id, measurementUnitDTO) {
        return MeasurementUnitRepository.findByIdAndUpdate(_id, measurementUnitDTO)
    }
    delete(_id) {
        return MeasurementUnitRepository.findByIdAndDelete(_id)
    }
}

export default new MeasurementUnitService();
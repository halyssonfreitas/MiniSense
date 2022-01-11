import DataStreamRepository from "../repository/DataStreamRepository";

class DataStreamService {
    get() {
        return DataStreamRepository.find({});
    }
    getById(_id) {
        return DataStreamRepository.findById(_id)
    }
    create(dataStream) {
        return DataStreamRepository.create(dataStream)
    }
    update(_id, dataStream) {
        return DataStreamRepository.findByIdAndUpdate(_id, dataStream)
    }
    delete(_id) {
        return DataStreamRepository.findByIdAndDelete(_id)
    }
}

export default new DataStreamService();
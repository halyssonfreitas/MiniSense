import UserRepository from "../repository/UserRepository";

class UserService {
    get() {
        return UserRepository.find({});
    }
    getById(_id) {
        return UserRepository.findById(_id)
    }
    create(dataStream) {
        console.log("UserService - create() : " + dataStream)
        return UserRepository.create(dataStream)
    }
    update(_id, dataStream) {
        return UserRepository.findByIdAndUpdate(_id, dataStream)
    }
    delete(_id) {
        return UserRepository.findByIdAndDelete(_id)
    }
}

export default new UserService();
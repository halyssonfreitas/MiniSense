import UserRepository from "../repository/UserRepository";

class UserService {
    get() {
        return UserRepository.find({}).populate(['SensorDevices']);
    }
    getById(_id) {
        return UserRepository.findById(_id)
    }
    create(user) {
        console.log("UserService - create() : " + user)
        return UserRepository.create(user)
    }
    update(_id, user) {
        console.log(`UserService - update() : _id ${_id} - user ${user}`)
        return UserRepository.findByIdAndUpdate(_id, user)
    }
    delete(_id) {
        return UserRepository.findByIdAndDelete(_id)
    }
}

export default new UserService();
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository_1 = require("../repository/UserRepository");
class UserService {
    get() {
        return UserRepository_1.default.find({});
    }
    getById(_id) {
        return UserRepository_1.default.findById(_id);
    }
    create(user) {
        console.log("UserService - create() : " + user);
        return UserRepository_1.default.create(user);
    }
    update(_id, user) {
        console.log(`UserService - update() : _id ${_id} - user ${user}`);
        return UserRepository_1.default.findByIdAndUpdate(_id, user);
    }
    delete(_id) {
        return UserRepository_1.default.findByIdAndDelete(_id);
    }
}
exports.default = new UserService();

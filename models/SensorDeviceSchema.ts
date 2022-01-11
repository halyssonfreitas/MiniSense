import * as mongoose from "mongoose"

const Schema = mongoose.Schema

const SensorDeviceSchema = new Schema({
    key: { type: String },
    label: { type: String },
    description: { type: String },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    DataStreams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "DataStream",
    }],

});

export default SensorDeviceSchema;
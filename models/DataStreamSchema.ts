import * as mongoose from "mongoose"

const Schema = mongoose.Schema

const DataStreamSchema = new Schema({
    key: { type: String },
    label: { type: String },
    enabled: { type: Boolean },
    SensorDevice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SensorDevice",
        require: true,
    },
    MeasurementUnit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MeasurementUnit",
        require: true,
    },
    SensorDatas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SensorData",
    }],

});

export default DataStreamSchema;
import * as mongoose from "mongoose"

const Schema = mongoose.Schema

const SensorDataSchema = new Schema({
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    },
    // Avaliar se Number se adequa a double
    value: { type: Number },
    MeasurementUnit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MeasurementUnit",
        required: true,
    },
    DataStream: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DataStream",
        required: true,
    },
});

export default SensorDataSchema;
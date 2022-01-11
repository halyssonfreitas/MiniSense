import * as mongoose from "mongoose"

import SensorDeviceSchema from "../models/SensorDeviceSchema"

export default mongoose.model("SensorDevice", SensorDeviceSchema)
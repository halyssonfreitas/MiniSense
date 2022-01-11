import * as mongoose from "mongoose"

import SensorDataSchema from "../models/SensorDataSchema"

export default mongoose.model("SensorData", SensorDataSchema)
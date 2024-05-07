import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";


const parkingLot = new mongoose.Schema(
  {
    name: { type: String, required: true },
    floor: { type: Number, unique: true, required: true },
    slots: Object,
  },
  { versionKey: false, timestamps: true }
).plugin(uniqueValidator);

export const ParkingLot = mongoose.model("parking_lot", parkingLot);

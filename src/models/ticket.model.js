import mongoose from "mongoose";


const ticket = new mongoose.Schema(
  {
    plateNumber: { type: String, required: true },
    size: { type: String, enum: ["s", "m", "l", "xl"], required: true },
    slotID: Number,
    parkingId: String,
    parkingFloor: Number,
    parkedAt: { type: Date },
    exitedAt: { type: Date },
  },
  { versionKey: false, timestamps: false }
);
export const Ticket = mongoose.model("ticket", ticket);

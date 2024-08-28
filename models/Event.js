import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    totalSeats: { type: Number, required: true },
    availableSeats: { type: Number, required: true, min: 0 },
    ticketPrice: { type: Number, required: true },
    category: { type: String, enum: ["museum", "event"], required: true },
  },
  { timestamps: true },
);

const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

export default Event;

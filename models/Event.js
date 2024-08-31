const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		// location: { type: String },
		startDate: { type: Date, required: true },
		endDate: { type: Date, required: true },
		startTime: { type: String, required: true },
		endTime: { type: String, required: true },
		// totalSeats: { type: Number, required: true },
		availableSeats: { type: Number },
		ticketPrice: { type: Number, required: true },
		category: { type: String, enum: ["museum", "event"] },
	},
	{ timestamps: true }
);

const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

module.exports = Event;

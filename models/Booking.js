const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
	{
		userId: { type: String, required: true },
		chatId: { type: String, required: true },
		eventId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Event",
			required: true,
		},
		numberOfTickets: { type: Number, required: true, min: 1 },
		srCitizenTickets: { type: Number, default: 0 },
		childTickets: { type: Number, default: 0 },
		studentTickets: { type: Number, default: 0 },
		foreignerTickets: { type: Number, default: 0 },
		bookingDate: { type: Date, required: true },
		bookingTime: { type: String, required: true },
	},
	{ timestamps: true }
);

const Booking =
	mongoose.models.Booking || mongoose.model("Booking", BookingSchema);

module.exports = Booking;

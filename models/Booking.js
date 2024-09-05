const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
	{
		name: { type: String, required: true }, // User's name
		phone_number: { type: String, required: true }, // User's phone number
		event_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Event",
			required: true,
		}, // Event ID (ObjectId referencing Event)
		no_of_adult_tickets: { type: Number, required: true, min: 0 }, // Adult tickets
		no_of_child_tickets: { type: Number, default: 0 }, // Child tickets
		no_of_sr_citizen_tickets: { type: Number, default: 0 }, // Senior citizen tickets
		no_of_student_tickets: { type: Number, default: 0 }, // Student tickets
		no_of_foreigner_tickets: { type: Number, default: 0 }, // Foreigner tickets
		booking_amount: { type: Number, required: true }, // Booking amount (total cost)
		booking_date: { type: Date, required: true }, // Date of booking in YYYY-MM-DD
		booking_time: { type: String, required: true }, // Time of booking in military format (e.g., 0900)
	},
	{ timestamps: true }
);

const Booking =
	mongoose.models.Booking || mongoose.model("Booking", BookingSchema);

module.exports = Booking;

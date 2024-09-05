import { NextResponse } from "next/server";
import Booking from "@/models/Booking"; // Adjust the path if necessary
import connectMongo from "@/lib/mongoose";

// Get all bookings
export async function GET(req) {
	try {
		// Connect to the database
		await connectMongo();

		// Fetch all bookings from the database
		const bookings = await Booking.find();

		// Return the bookings
		return NextResponse.json(bookings, { status: 200 });
	} catch (error) {
		console.error("Error fetching bookings:", error);
		return NextResponse.json(
			{ error: "Failed to fetch bookings" },
			{ status: 500 }
		);
	}
}

// Create a new booking
export async function POST(req) {
	try {
		// Connect to the database
		await connectMongo();

		// Parse the request body
		const body = await req.json();

		// Destructure the fields according to the updated schema
		const {
			name,
			phone_number,
			event_id = "AA", // Default value if event_id is not provided
			no_of_adult_tickets = 0,
			no_of_child_tickets = 0,
			no_of_sr_citizen_tickets = 0,
			no_of_student_tickets = 0,
			no_of_foreigner_tickets = 0,
			booking_amount,
			booking_date,
			booking_time = "0000", // Default value if booking_time is not provided
		} = body;
		// Create a new booking using the destructured fields
		const newBooking = new Booking({
			name,
			phone_number,
			event_id,
			no_of_adult_tickets,
			no_of_child_tickets,
			no_of_sr_citizen_tickets,
			no_of_student_tickets,
			no_of_foreigner_tickets,
			booking_amount,
			booking_date,
			booking_time,
		});

		// Save the booking to the database
		const savedBooking = await newBooking.save();

		// Return a response
		return NextResponse.json(savedBooking, { status: 201 });
	} catch (error) {
		console.error("Error creating booking:", error);
		return NextResponse.json(
			{ error: "Failed to create booking" },
			{ status: 500 }
		);
	}
}

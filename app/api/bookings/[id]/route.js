import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Booking from "@/models/Booking"; // Adjust the path if necessary
import connectMongo from "@/lib/mongoose";

// Get a booking by ID
export async function GET(req, { params }) {
	try {
		// Connect to the database
		await connectMongo();

		const { id } = params;

		// Check if the provided ID is a valid ObjectId
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return NextResponse.json(
				{ error: "Invalid booking ID" },
				{ status: 400 }
			);
		}

		// Find the booking by ID
		const booking = await Booking.findById(id);

		// If the booking doesn't exist
		if (!booking) {
			return NextResponse.json({ error: "Booking not found" }, { status: 404 });
		}

		// Return the booking
		return NextResponse.json(booking, { status: 200 });
	} catch (error) {
		console.error("Error fetching booking by ID:", error);
		return NextResponse.json(
			{ error: "Failed to fetch booking" },
			{ status: 500 }
		);
	}
}

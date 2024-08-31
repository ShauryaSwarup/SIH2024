import connectMongo from "@/lib/mongoose";
import Event from "@/models/Event"; // Import your Event model
import { ObjectId } from "mongodb";

// GET Route - Retrieve an event by its ObjectId
export async function GET(req, { params }) {
	try {
		// Connect to the database
		await connectMongo();

		// Extract the event ID from the URL params
		const { id } = params;

		// Validate the ObjectId
		if (!ObjectId.isValid(id)) {
			return new Response(JSON.stringify({ message: "Invalid event ID" }), {
				status: 400,
			});
		}

		// Find the event by its ObjectId
		const event = await Event.findById(id);

		if (!event) {
			return new Response(JSON.stringify({ message: "Event not found" }), {
				status: 404,
			});
		}

		return new Response(
			JSON.stringify({
				message: "Event retrieved successfully",
				event: event,
			}),
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error retrieving event:", error);
		return new Response(
			JSON.stringify({ message: "Failed to retrieve event" }),
			{
				status: 500,
			}
		);
	}
}

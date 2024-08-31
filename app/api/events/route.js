import connectMongo from "@/lib/mongoose";
import Event from "@/models/Event"; // Import your Event model

export async function POST(req) {
	try {
		// Connect to the database
		await connectMongo();

		const body = await req.json();
		const { title, description, startDate, endDate, startTime, endTime } = body;

		// Validate the incoming data
		if (!title || !startDate || !endDate || !startTime || !endTime) {
			return new Response(
				JSON.stringify({ message: "Missing required fields" }),
				{ status: 400 }
			);
		}

		// Ensure the dates are valid and in the correct format
		const start = new Date(startDate);
		const end = new Date(endDate);
		if (isNaN(start) || isNaN(end)) {
			return new Response(JSON.stringify({ message: "Invalid date format" }), {
				status: 400,
			});
		}

		// Create a new event
		const newEvent = new Event({
			name: title,
			description: description || "No description provided",
			startDate: start,
			endDate: end,
			startTime,
			endTime,
		});

		// Save the event to the database
		await newEvent.save();

		return new Response(
			JSON.stringify({
				message: "Event created successfully",
				event: newEvent,
			}),
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error creating event:", error);
		return new Response(JSON.stringify({ message: "Failed to create event" }), {
			status: 500,
		});
	}
}

// GET Route - Retrieve all events
export async function GET(req) {
	try {
		// Connect to the database
		await connectMongo();

		// Fetch all events from the database
		const events = await Event.find({});

		return new Response(
			JSON.stringify({
				message: "Events retrieved successfully",
				events: events,
			}),
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error retrieving events:", error);
		return new Response(
			JSON.stringify({ message: "Failed to retrieve events" }),
			{ status: 500 }
		);
	}
}
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
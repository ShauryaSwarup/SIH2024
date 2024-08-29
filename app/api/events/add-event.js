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
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const newEvent = new Event({
      name: title,
      description: description || "No description provided", // Default description if none provided
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      startTime,
      endTime,
      // availableSeats: 100, // Default value, modify as needed
      // ticketPrice: 20, // Default value, modify as needed
      // category: "event", // Default category, modify as needed
    });

    await newEvent.save();

    return new Response(
      JSON.stringify({ message: "Event created successfully", event: newEvent }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error creating event:", error);
    return new Response(
      JSON.stringify({ message: "Failed to create event", error: error.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

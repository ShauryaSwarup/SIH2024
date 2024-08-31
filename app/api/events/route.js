import connectMongo from "@/lib/mongoose";
import Event from "@/models/Event";

export async function GET() {
  try {
    await connectMongo();

    const events = await Event.find({});

    return new Response(JSON.stringify({ events }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to fetch events",
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function POST(req) {
  try {
    await connectMongo();

    const body = await req.json();
    const { title, description, startDate, endDate, startTime, endTime } = body;
    console.log("body" + body);

    if (!title || !startDate || !endDate || !startTime || !endTime) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const newEvent = new Event({
      name: title,
      description: description || "No description provided",
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      startTime,
      endTime,
      // availableSeats: 100, // Default value
      ticketPrice: 20, // Default value
      // category: "event", // Default category
    });

    await newEvent.save();

    return new Response(
      JSON.stringify({
        message: "Event created successfully",
        event: newEvent,
      }),
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
      JSON.stringify({
        message: "Failed to create event",
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function DELETE(req) {
  try {
    await connectMongo();

    const { id } = await req.json();
    console.log("id in api" + id);

    if (!id) {
      return new Response(JSON.stringify({ message: "Event ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await Event.findByIdAndDelete(id);

    return new Response(
      JSON.stringify({ message: "Event deleted successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error deleting event:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to delete event",
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

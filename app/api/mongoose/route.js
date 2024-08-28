import connectMongo from "@/lib/mongoose";

export async function GET(req) {
  try {
    // Attempt to connect to MongoDB
    await connectMongo();
    // If successful, send a response using Response()
    return new Response(
      JSON.stringify({ message: "Connected to MongoDB successfully!" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    // If connection fails, send an error response
    return new Response(
      JSON.stringify({
        message: "Failed to connect to MongoDB",
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}

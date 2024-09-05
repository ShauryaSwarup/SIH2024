// app/api/bookings/checkout-session/[tourId]/route.js
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request, { params }) {
	const { tourId } = params;

	try {
		const session = await axios.get(
			`https://your-backend-url/api/v1/bookings/checkout-session/${tourId}`
		);
		return NextResponse.json({ sessionId: session.data.session.id });
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to create checkout session" },
			{ status: 500 }
		);
	}
}

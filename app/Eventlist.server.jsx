// /app/events/EventList.server.jsx
import connectMongo from "@/lib/mongoose";
import Event from "@/models/Event";
import EventContainer from "../../components/EventContainer.client"; // Adjust path

export default async function EventList() {
	await connectMongo();

	const events = await Event.find({});

	return <EventContainer events={events} />;
}

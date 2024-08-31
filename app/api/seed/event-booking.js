const mongoose = require("mongoose");
const Event = require("../../../models/Event");
const Booking = require("../../../models/Booking");
const connectMongo = require("../../../lib/mongoose");

const seed = async () => {
	await connectMongo();

	// Remove existing data
	await Booking.deleteMany({});
	await Event.deleteMany({});

	// Create sample events
	const events = [
		{
			name: "Art Exhibition",
			description: "A modern art exhibition showcasing various artists.",
			startDate: new Date("2024-09-15"),
			endDate: new Date("2024-09-15"),
			startTime: "14:00",
			endTime: "18:00",
			availableSeats: 100,
			ticketPrice: 20,
			category: "event",
		},
		{
			name: "Historical Museum Tour",
			description: "A guided tour of the city's historical artifacts.",
			startDate: new Date("2024-09-20"),
			endDate: new Date("2024-09-20"),
			startTime: "10:00",
			endTime: "12:00",
			availableSeats: 50,
			ticketPrice: 15,
			category: "museum",
		},
		{
			name: "Science Fair",
			description: "Explore the latest advancements in science and technology.",
			startDate: new Date("2024-10-05"),
			endDate: new Date("2024-10-05"),
			startTime: "09:00",
			endTime: "17:00",
			availableSeats: 200,
			ticketPrice: 10,
			category: "event",
		},
		{
			name: "Natural History Museum Visit",
			description: "A journey through the natural world with guided tours.",
			startDate: new Date("2024-11-01"),
			endDate: new Date("2024-11-01"),
			startTime: "11:00",
			endTime: "15:00",
			availableSeats: 75,
			ticketPrice: 18,
			category: "museum",
		},
	];

	// Insert the sample events into the database and store the references
	const insertedEvents = await Event.insertMany(events);

	// Create sample bookings using the inserted event IDs
	const booking1 = new Booking({
		userId: "user001",
		chatId: "chat001",
		eventId: insertedEvents[0]._id, // Reference to the first event
		numberOfTickets: 2,
		srCitizenTickets: 1,
		childTickets: 0,
		studentTickets: 0,
		foreignerTickets: 1,
		bookingDate: new Date(),
		bookingTime: new Date().toTimeString().split(" ")[0],
	});

	const booking2 = new Booking({
		userId: "user002",
		chatId: "chat002",
		eventId: insertedEvents[1]._id, // Reference to the second event
		numberOfTickets: 3,
		srCitizenTickets: 0,
		childTickets: 1,
		studentTickets: 1,
		foreignerTickets: 0,
		bookingDate: new Date(),
		bookingTime: new Date().toTimeString().split(" ")[0],
	});

	await booking1.save();
	await booking2.save();

	console.log("Seeding completed successfully.");
	mongoose.connection.close();
};

seed().catch((error) => {
	console.error("Seeding failed:", error);
	mongoose.connection.close();
});

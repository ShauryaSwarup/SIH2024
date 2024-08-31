require('dotenv').config({ path: '.env.local' });
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
	// const events = [
	// 	{
	// 		name: "Art Exhibition",
	// 		description: "A modern art exhibition showcasing various artists.",
	// 		startDate: new Date("2024-09-15"),
	// 		endDate: new Date("2024-09-15"),
	// 		startTime: "14:00",
	// 		endTime: "18:00",
	// 		availableSeats: 100,
	// 		ticketPrice: 20,
	// 		category: "event",
	// 	},
	// 	{
	// 		name: "Historical Museum Tour",
	// 		description: "A guided tour of the city's historical artifacts.",
	// 		startDate: new Date("2024-09-20"),
	// 		endDate: new Date("2024-09-20"),
	// 		startTime: "10:00",
	// 		endTime: "12:00",
	// 		availableSeats: 50,
	// 		ticketPrice: 15,
	// 		category: "museum",
	// 	},
	// 	{
	// 		name: "Science Fair",
	// 		description: "Explore the latest advancements in science and technology.",
	// 		startDate: new Date("2024-10-05"),
	// 		endDate: new Date("2024-10-05"),
	// 		startTime: "09:00",
	// 		endTime: "17:00",
	// 		availableSeats: 200,
	// 		ticketPrice: 10,
	// 		category: "event",
	// 	},
	// 	{
	// 		name: "Natural History Museum Visit",
	// 		description: "A journey through the natural world with guided tours.",
	// 		startDate: new Date("2024-11-01"),
	// 		endDate: new Date("2024-11-01"),
	// 		startTime: "11:00",
	// 		endTime: "15:00",
	// 		availableSeats: 75,
	// 		ticketPrice: 18,
	// 		category: "museum",
	// 	},
	// ];

	const events = [
		// Original events
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
		
		// 20 New Events
		{
			name: "Ancient Egypt Exhibit",
			description: "Explore the wonders of ancient Egypt with this guided tour.",
			startDate: new Date("2024-09-05"),
			endDate: new Date("2024-09-05"),
			startTime: "11:00",
			endTime: "14:00",
			availableSeats: 150,
			ticketPrice: 50,
			category: "history",
		},
		{
			name: "Dinosaur Fossil Discovery",
			description: "A deep dive into the prehistoric world with real dinosaur fossils.",
			startDate: new Date("2024-09-07"),
			endDate: new Date("2024-09-07"),
			startTime: "09:00",
			endTime: "13:00",
			availableSeats: 200,
			ticketPrice: 80,
			category: "science",
		},
		{
			name: "Medieval Armor Exhibit",
			description: "Learn about medieval warfare and see real armor from the past.",
			startDate: new Date("2024-09-08"),
			endDate: new Date("2024-09-08"),
			startTime: "14:00",
			endTime: "18:00",
			availableSeats: 100,
			ticketPrice: 35,
			category: "history",
		},
		{
			name: "Impressionist Art Showcase",
			description: "A collection of beautiful Impressionist paintings from various artists.",
			startDate: new Date("2024-09-10"),
			endDate: new Date("2024-09-10"),
			startTime: "12:00",
			endTime: "16:00",
			availableSeats: 75,
			ticketPrice: 45,
			category: "arts and crafts",
		},
		{
			name: "Space Exploration Exhibit",
			description: "Discover the history and future of space exploration.",
			startDate: new Date("2024-09-12"),
			endDate: new Date("2024-09-12"),
			startTime: "13:00",
			endTime: "17:00",
			availableSeats: 150,
			ticketPrice: 70,
			category: "science",
		},
		{
			name: "Renaissance Art Collection",
			description: "A stunning collection of Renaissance masterpieces.",
			startDate: new Date("2024-09-14"),
			endDate: new Date("2024-09-14"),
			startTime: "10:00",
			endTime: "13:00",
			availableSeats: 100,
			ticketPrice: 30,
			category: "arts and crafts",
		},
		{
			name: "Modern Architecture Exhibit",
			description: "Explore the architectural wonders of the modern world.",
			startDate: new Date("2024-09-17"),
			endDate: new Date("2024-09-17"),
			startTime: "15:00",
			endTime: "18:00",
			availableSeats: 150,
			ticketPrice: 90,
			category: "architecture",
		},
		{
			name: "Wildlife Photography Exhibition",
			description: "A showcase of stunning wildlife photography from around the globe.",
			startDate: new Date("2024-09-18"),
			endDate: new Date("2024-09-18"),
			startTime: "09:00",
			endTime: "12:00",
			availableSeats: 50,
			ticketPrice: 25,
			category: "photography",
		},
		{
			name: "Ancient Greek Sculptures",
			description: "A tour of the finest ancient Greek sculptures.",
			startDate: new Date("2024-09-19"),
			endDate: new Date("2024-09-19"),
			startTime: "10:00",
			endTime: "13:00",
			availableSeats: 75,
			ticketPrice: 40,
			category: "history",
		},
		{
			name: "World War II Memorabilia",
			description: "A collection of rare World War II artifacts and memorabilia.",
			startDate: new Date("2024-09-21"),
			endDate: new Date("2024-09-21"),
			startTime: "11:00",
			endTime: "14:00",
			availableSeats: 100,
			ticketPrice: 55,
			category: "history",
		},
		{
			name: "Victorian Era Fashion Display",
			description: "A display of elegant fashion from the Victorian Era.",
			startDate: new Date("2024-09-22"),
			endDate: new Date("2024-09-22"),
			startTime: "13:00",
			endTime: "16:00",
			availableSeats: 100,
			ticketPrice: 65,
			category: "fashion",
		},
		{
			name: "Botanical Art Exhibit",
			description: "An artistic exploration of plants and flowers through botanical art.",
			startDate: new Date("2024-09-23"),
			endDate: new Date("2024-09-23"),
			startTime: "14:00",
			endTime: "18:00",
			availableSeats: 150,
			ticketPrice: 85,
			category: "arts and crafts",
		},
		{
			name: "Native American History Exhibit",
			description: "Learn about the rich history and culture of Native Americans.",
			startDate: new Date("2024-09-24"),
			endDate: new Date("2024-09-24"),
			startTime: "09:00",
			endTime: "12:00",
			availableSeats: 75,
			ticketPrice: 35,
			category: "history",
		},
		{
			name: "Ocean Life Photography Exhibition",
			description: "A showcase of stunning ocean life photography.",
			startDate: new Date("2024-09-25"),
			endDate: new Date("2024-09-25"),
			startTime: "12:00",
			endTime: "15:00",
			availableSeats: 50,
			ticketPrice: 40,
			category: "photography",
		},
		{
			name: "Modern Sculpture Exhibition",
			description: "Explore contemporary sculptures from renowned artists.",
			startDate: new Date("2024-09-26"),
			endDate: new Date("2024-09-26"),
			startTime: "14:00",
			endTime: "18:00",
			availableSeats: 200,
			ticketPrice: 100,
			category: "arts and crafts",
		},
		{
			name: "Ancient Chinese Artifacts",
			description: "Discover the art and culture of ancient China.",
			startDate: new Date("2024-09-27"),
			endDate: new Date("2024-09-27"),
			startTime: "10:00",
			endTime: "13:00",
			availableSeats: 75,
			ticketPrice: 50,
			category: "history",
		},
		{
			name: "Futuristic Technology Exhibit",
			description: "An exhibit of cutting-edge technology and futuristic concepts.",
			startDate: new Date("2024-09-28"),
			endDate: new Date("2024-09-28"),
			startTime: "11:00",
			endTime: "15:00",
			availableSeats: 100,
			ticketPrice: 120,
			category: "technology",
		},
		{
			name: "African Art and Culture Exhibition",
			description: "Explore the diverse art and culture of Africa.",
			startDate: new Date("2024-09-29"),
			endDate: new Date("2024-09-29"),
			startTime: "09:00",
			endTime: "13:00",
			availableSeats: 150,
			ticketPrice: 90,
			category: "culture",
		},
		{
			name: "The Art of Photography",
			description: "A display of creative photography from various genres.",
			startDate: new Date("2024-09-30"),
			endDate: new Date("2024-09-30"),
			startTime: "10:00",
			endTime: "14:00",
			availableSeats: 75,
			ticketPrice: 45,
			category: "photography",
		},
		{
			name: "Renaissance Music Exhibit",
			description: "A deep dive into the history of Renaissance music.",
			startDate: new Date("2024-09-30"),
			endDate: new Date("2024-09-30"),
			startTime: "15:00",
			endTime: "19:00",
			availableSeats: 200,
			ticketPrice: 150,
			category: "music",
		},
	];
	

	// Insert the sample events into the database and store the references
	const insertedEvents = await Event.insertMany(events);

	// Create sample bookings using the inserted event IDs
	// const booking1 = new Booking({
	// 	userId: "user001",
	// 	chatId: "chat001",
	// 	eventId: insertedEvents[0]._id, // Reference to the first event
	// 	numberOfTickets: 2,
	// 	srCitizenTickets: 1,
	// 	childTickets: 0,
	// 	studentTickets: 0,
	// 	foreignerTickets: 1,
	// 	bookingDate: new Date(),
	// 	bookingTime: new Date().toTimeString().split(" ")[0],
	// });

	// const booking2 = new Booking({
	// 	userId: "user002",
	// 	chatId: "chat002",
	// 	eventId: insertedEvents[1]._id, // Reference to the second event
	// 	numberOfTickets: 3,
	// 	srCitizenTickets: 0,
	// 	childTickets: 1,
	// 	studentTickets: 1,
	// 	foreignerTickets: 0,
	// 	bookingDate: new Date(),
	// 	bookingTime: new Date().toTimeString().split(" ")[0],
	// });

	// await booking1.save();
	// await booking2.save();



	// Helper function to generate a random date between two dates
	function randomDate(start, end) {
		return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
	}

	// Helper function to generate a random number within a range
	function randomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	// Start and end dates for the booking date range
	const startDate = new Date("2024-08-20");
	const endDate = new Date("2024-08-31");

	const bookings = [];

	for (let i = 0; i < 50; i++) {
		const numberOfTickets = randomInt(1, 5); // Total tickets booked
		const srCitizenTickets = randomInt(0, numberOfTickets); // Senior citizen tickets
		const remainingTickets = numberOfTickets - srCitizenTickets;
		const childTickets = randomInt(0, remainingTickets); // Child tickets
		const remainingAfterChildren = remainingTickets - childTickets;
		const studentTickets = randomInt(0, remainingAfterChildren); // Student tickets
		const foreignerTickets = numberOfTickets - srCitizenTickets - childTickets - studentTickets; // Foreigner tickets

		const booking = new Booking({
			userId: `user${randomInt(3, 100)}`, // Random user ID
			chatId: `chat${randomInt(3, 100)}`, // Random chat ID
			eventId: insertedEvents[randomInt(0, 21)]._id, // Random event from the array
			numberOfTickets: numberOfTickets,
			srCitizenTickets: srCitizenTickets,
			childTickets: childTickets,
			studentTickets: studentTickets,
			foreignerTickets: foreignerTickets,
			bookingDate: randomDate(startDate, endDate), // Random booking date within the range
			bookingTime: new Date().toTimeString().split(" ")[0], // Current time
		});

		bookings.push(booking);
	}

	// Save all bookings to the database
	await Booking.insertMany(bookings);
	console.log(`${bookings.length} bookings created successfully!`);


	console.log("Seeding completed successfully.");
	mongoose.connection.close();
};

seed().catch((error) => {
	console.error("Seeding failed:", error);
	mongoose.connection.close();
});


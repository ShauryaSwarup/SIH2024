"use client";
import SendEmailComponent from "@/components/SendEmailComponent";
import { useSession } from "next-auth/react";
import React from "react";

export default function EmailComponent({ booking , success}) {
	const { data: session, status } = useSession();
	if (status === "loading") {
		// Optionally show a loading state while session data is being fetched
		return <p>Loading...</p>;
	}

	// const booking = {
	// 	name: "John Doe",
	// 	phone_number: "9876543210",
	// 	event_id: "Music Festival 2024",
	// 	no_of_adult_tickets: 2,
	// 	no_of_child_tickets: 1,
	// 	no_of_sr_citizen_tickets: 1,
	// 	no_of_student_tickets: 0,
	// 	no_of_foreigner_tickets: 0,
	// 	booking_amount: 3000, // in currency (₹)
	// 	booking_date: "2024-09-15", // YYYY-MM-DD format
	// 	booking_time: "1800", // Military hours format (6:00 PM)
	// 	interests: "Music, Outdoor Events, Family Activities", // Based on age/demographics
	// };

	// Create booking with booking details
	const emailData = {
		to: session.user.email,
		subject: "Here's your booking confirmation",
		text: `Hello ${session.user.name || "Customer"},

Thank you for booking with Sarathi! Here are your booking details:

- Event: ${booking.event_id === "AA" ? "General Admission" : booking.event_id}
- Total Adult Tickets: ${booking.no_of_adult_tickets}
- Total Child Tickets: ${booking.no_of_child_tickets}
- Total Senior Citizen Tickets: ${booking.no_of_sr_citizen_tickets}
- Total Student Tickets: ${booking.no_of_student_tickets}
- Total Foreigner Tickets: ${booking.no_of_foreigner_tickets}
- Total Booking Amount: ₹${booking.booking_amount}
- Booking Date: ${booking.booking_date}
- Event Time: ${
			booking.booking_time === "0000"
				? "General Admission"
				: booking.booking_time
		} hrs

Based on your preferences, we have tailored this event to your interests: ${
			booking.interests
		}.

We look forward to providing you with an amazing experience! If you have any questions or need assistance, feel free to contact us at any time.

Best regards,  
The Sarathi Team`,
	};

	return <SendEmailComponent emailData={emailData} success={success} />;
}

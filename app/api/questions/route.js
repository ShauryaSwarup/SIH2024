import { NextResponse } from "next/server";

// Sample data to represent questions
const predefinedQuestions = [
	{
		text: "Which event would you like to book?",
		type: "text",
		suggestedReplies: ["Concert", "Conference", "Sports Event"],
	},
	{
		text: "How many tickets would you like to purchase?",
		type: "text",
		suggestedReplies: ["1", "2", "3", "4"],
	},
	{
		text: "Do you need any special tickets? (e.g., Senior Citizen, Child, Student, Foreigner)",
		type: "table",
		suggestedReplies: ["Senior Citizen", "Child", "Student", "Foreigner"],
	},
	{
		text: "Just to confirm, you'd like to book [Number of Tickets] tickets for the [Event Name] event. Is that correct?",
		type: "confirmation",
		suggestedReplies: ["Yes", "No"],
	},
];

// Handle GET requests
export async function GET(request) {
	// Get the index from query parameters
	const { searchParams } = new URL(request.url);
	const index = parseInt(searchParams.get("index") || "0", 10);

	// Return the question based on the index
	if (index >= 0 && index < predefinedQuestions.length) {
		return NextResponse.json(predefinedQuestions[index]);
	} else {
		return NextResponse.json({
			text: "No more questions.",
			type: "info",
			suggestedReplies: [],
		});
	}
}

"use client";
import {
	ActionIcon,
	Alert,
	Group,
	Paper,
	ScrollArea,
	Stack,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { ChevronDown } from "tabler-icons-react";
import ChatBox from "./ChatBox";
import ChatMessage from "./ChatMessage";
import Loading from "./Loading";
import NavBar from "./NavBar";
import axios from "axios"; // Import axios for making API requests
import { useSession } from "next-auth/react";

const ChatRoom = () => {
	const { data: session, status } = useSession();

	const [mes, setMes] = useState([]);
	const [questions, setQuestions] = useState([]); // State to store questions
	const [loading, setLoading] = useState(true);
	const [quota, setQuota] = useState(false);
	const dummy = useRef(null);
	const [replyInfo, setReplyInfo] = useState([]);
	const [id, setId] = useState("");
	const [ruid, setRuid] = useState("");
	const [hidden, setHidden] = useState(true);
	const { ref, inView } = useInView({
		delay: 600,
		threshold: 1,
	});

	const addMessage = (newMessage) => {
		setMes((prevMes) => [...prevMes, newMessage]);
		goBot(); // To scroll to the bottom after adding a new message
	};

	useEffect(() => {
		fetchQuestions();
		setTimeout(() => {
			// Initialize messages or other tasks here
		}, 500);
	}, []);

	useEffect(() => {
		goBot();
	}, [mes]);

	// Fetch questions from the backend
	const fetchQuestions = () => {
		const predefinedQuestions = [
			{ text: "Which event would you like to book?", type: "text" },
			{ text: "How many tickets would you like to purchase?", type: "text" },
			{
				text: "Do you need any special tickets? (e.g., Senior Citizen, Child, Student, Foreigner)",
				type: "table",
			},
			{
				text: "Just to confirm, you'd like to book [Number of Tickets] tickets for the [Event Name] event. Is that correct?",
				type: "confirmation",
			},
		];

		setQuestions(predefinedQuestions);
		setLoading(false);
	};

	// Handle user message submission
	const [bookingDetails, setBookingDetails] = useState({
		eventName: "",
		numberOfTickets: 0,
		srCitizenTickets: 0,
		childTickets: 0,
		studentTickets: 0,
		foreignerTickets: 0,
	});

	const handleUserMessage = (userMessage) => {
		setMes((prevMessages) => [
			...prevMessages,
			{ text: userMessage, uid: "user" },
		]);

		// Logic to update booking details based on the question being answered
		if (questions.length === 4) {
			setBookingDetails((prevDetails) => ({
				...prevDetails,
				eventName: userMessage,
			}));
		} else if (questions.length === 3) {
			setBookingDetails((prevDetails) => ({
				...prevDetails,
				numberOfTickets: parseInt(userMessage),
			}));
		} else if (questions.length === 2) {
			// Parse special ticket types here
			// e.g., extract the number of special tickets from userMessage
		}
		goBot();
		respondWithQuestion();
		goBot();
	};

	// Respond with a predefined question
	const respondWithQuestion = () => {
		if (questions.length > 0) {
			const currentQuestion = questions[0]; // Get the first question
			setMes((prevMessages) => [
				...prevMessages,
				{ text: currentQuestion.text, type: currentQuestion.type, uid: "bot" },
			]);

			// Remove the first question from the list once it's asked
			setQuestions((prevQuestions) => prevQuestions.slice(1));
		} else {
			setMes((prevMessages) => [
				...prevMessages,
				{ text: "Thank you! Please proceed to payment.", uid: "bot" },
			]);
		}
		goBot();
	};

	function goBot() {
		dummy.current?.scrollIntoView({ behavior: "smooth" });
		setHidden(true);
		setId("");
	}

	if (!session) {
		return <div>Please sign in to access the chat.</div>;
	}

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<>
					<NavBar />
					<Stack style={{ height: "65vh" }} p={0}>
						<ScrollArea
							// h={"65vh"}
							p="xs"
							scrollbarSize={1}
							style={{ height: "65vh" }}
						>
							<Stack>
								<Group hidden={inView} justify="center" pt="xs">
									<Paper
										shadow="md"
										radius="xl"
										withBorder
										p={0}
										// className=" mx-auto"
										style={{ position: "absolute", top: "90%" }}
									>
										<ActionIcon color="violet" radius="xl" onClick={goBot}>
											<ChevronDown />
										</ActionIcon>
									</Paper>
								</Group>

								{mes.map((msg, id) => {
									return (
										<ChatMessage
											key={id}
											message={msg} // msg should contain all necessary properties for ChatMessage
											// replyMessage={replyMessage}
										/>
									);
								})}
							</Stack>
							<div ref={ref}></div>
							<div ref={dummy}></div>
						</ScrollArea>

						{replyInfo.map((data, id) => {
							return (
								<Alert
									key={id}
									style={{ minHeight: "10%" }}
									hidden={hidden}
									title={`Replying to ` + data.name}
									color="gray"
									p="xs"
									radius={0}
									withCloseButton
									onClose={() => {
										setHidden(true);
										setId("");
									}}
								>
									{data.text}
								</Alert>
							);
						})}
					</Stack>
					<ChatBox
						fn={goBot}
						id={id}
						ruid={ruid}
						addMessage={addMessage}
						onUserMessage={handleUserMessage}
					/>
				</>
			)}
		</>
	);
};
export default ChatRoom;

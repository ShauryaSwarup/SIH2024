"use client";
import {
	ActionIcon,
	Alert,
	Button,
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
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [loading, setLoading] = useState(true);
	const [currentSuggestedReplies, setCurrentSuggestedReplies] = useState([]);
	const dummy = useRef(null);
	const [replyInfo, setReplyInfo] = useState([]);
	const [id, setId] = useState("");
	const [ruid, setRuid] = useState("");
	const [hidden, setHidden] = useState(true);
	const { ref, inView } = useInView({
		delay: 600,
		threshold: 1,
	});

	useEffect(() => {
		fetchQuestion(currentQuestionIndex);
	}, [currentQuestionIndex]);

	useEffect(() => {
		goBot();
	}, [mes]);
	const [lastFetchedMessage, setLastFetchedMessage] = useState(null);

	// Define the total number of questions (assuming 5 for this example)
	const totalQuestions = 5;

	// Fetch question based on the index
	const fetchQuestion = async (index) => {
		try {
			const response = await axios.get(`/api/questions?index=${index}`);
			if (response.status === 200) {
				const question = response.data;

				// Check if the question has already been added or is the same as the last fetched message
				const isQuestionAlreadyAdded = mes.some(
					(msg) => msg.text === question.text && msg.uid === "bot"
				);

				// Check if the new question is the same as the last fetched question
				const isSameAsLastFetchedMessage =
					lastFetchedMessage?.text === question.text;

				if (!isQuestionAlreadyAdded && !isSameAsLastFetchedMessage) {
					setMes((prevMessages) => [
						...prevMessages,
						{ text: question.text, type: question.type, uid: "bot" },
					]);
					setCurrentSuggestedReplies(question.suggestedReplies);
					setLastFetchedMessage({
						text: question.text,
						type: question.type,
						uid: "bot",
					});
				}

				setLoading(false);

				// If this is the last question, trigger the email
				if (index === totalQuestions - 1) {
					sendEmailConfirmation();
				}
			}
		} catch (error) {
			console.error("Error fetching question:", error);
			setLoading(false);
		}
	};

	// if(session)console.log("email = ", session.user.email);
	// Function to send email confirmation
	const sendEmailConfirmation = async () => {
		try {
			const response = await axios.post("/api/send-email", {
				to: session.user.email, // Send email to the logged-in user
				subject: "All Questions Answered",
				message:
					"Congratulations! You have successfully answered all the questions.",
			});
			if (response.status === 200) {
				console.log("Email sent successfully");
			} else {
				console.error("Failed to send email");
			}
		} catch (error) {
			console.error("Error sending email:", error);
		}
	};

	// Handle user message submission
	const handleUserMessage = (userMessage) => {
		addMessage({ text: userMessage, uid: "user" });

		// Move to the next question
		setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
	};

	// Add a new message to the chat
	const addMessage = (newMessage) => {
		setMes((prevMes) => [...prevMes, newMessage]);
		goBot(); // To scroll to the bottom after adding a new message
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
						<ScrollArea p="xs" scrollbarSize={1} style={{ height: "65vh" }}>
							<Stack>
								<Group hidden={inView} justify="center" pt="xs">
									<Paper
										shadow="md"
										radius="xl"
										withBorder
										p={0}
										style={{ position: "absolute", top: "90%" }}
									>
										<ActionIcon color="violet" radius="xl" onClick={goBot}>
											<ChevronDown />
										</ActionIcon>
									</Paper>
								</Group>

								{mes.map((msg, id) => (
									<ChatMessage key={id} message={msg} />
								))}
							</Stack>
							<div ref={ref}></div>
							<div ref={dummy}></div>
						</ScrollArea>

						{replyInfo.map((data, id) => (
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
						))}

						{currentSuggestedReplies.length > 0 && (
							<Group position="center" style={{ marginBottom: "8px" }}>
								{currentSuggestedReplies.map((reply, index) => (
									<Button
										key={index}
										variant="outline"
										radius="xl"
										onClick={() => handleUserMessage(reply)}
									>
										{reply}
									</Button>
								))}
							</Group>
						)}
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

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
import axios from "axios";
import { useSession } from "next-auth/react";
import Checkout from "../Checkout/CheckoutForm";

const ChatRoom = () => {
	const { data: session, status } = useSession();
	const [mes, setMes] = useState([]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [loading, setLoading] = useState(true);
	const [currentSuggestedReplies, setCurrentSuggestedReplies] = useState([]);
	const dummy = useRef(null);
	const [replyInfo, setReplyInfo] = useState([]);
	const [messageList, setMessageList] = useState([]);
	const [hidden, setHidden] = useState(true);
	const [userInitiated, setUserInitiated] = useState(false); // New state variable
	const [booking, setBooking] = useState();

	const { ref, inView } = useInView({
		delay: 600,
		threshold: 1,
	});
	const FAST_API_URI =
		"https://0c94-2409-40c0-104c-7300-d544-e92e-47a5-474d.ngrok-free.app";
	useEffect(() => {
		initializeChat();
	}, []);

	useEffect(() => {
		if (userInitiated) {
			// Check if the message was user-initiated
			handleChatInteraction();
			setUserInitiated(false); // Reset after handling interaction
		}
	}, [mes]);

	const initializeChat = async () => {
		try {
			const response = await axios.post(`${FAST_API_URI}/chat/new/`);

			if (response.status === 200) {
				const responseData = response.data;
				const messageList = responseData.message_list;

				if (messageList && messageList.length > 0) {
					const lastMessageObject = messageList[messageList.length - 1];

					if (lastMessageObject && lastMessageObject.content) {
						const parsedContent = JSON.parse(lastMessageObject.content.trim());

						setMessageList(messageList);
						addMessage({
							text: parsedContent.response,
							uid: "bot",
						});
						setCurrentSuggestedReplies(parsedContent.suggested);
					} else {
						console.error(
							"Last message object does not contain valid content or is improperly accessed."
						);
					}
				}
				setLoading(false);
			}
		} catch (error) {
			console.error("Error initializing chat:", error);
			setLoading(false);
		}
	};

	const handleUserMessage = (userMessage) => {
		addMessage({ text: userMessage, uid: "user" });
		setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
		setUserInitiated(true); // Mark that the message was user-initiated
	};

	const addMessage = (newMessage) => {
		setMes((prevMes) => [...prevMes, newMessage]);
		goBot();
	};

	const handleChatInteraction = async () => {
		try {
			const userMessage = mes[mes.length - 1].text;

			const response = await axios.post(`${FAST_API_URI}/chat/`, {
				message_list: messageList,
				query: userMessage,
			});

			if (response.status === 200) {
				const data = response.data;
				if (data.booking) {
					console.log("HERE ", data.booking);
					initiateBooking(data.booking);
				}
				const lastMessage = data.message_list[data.message_list.length - 1];
				const parsedContent = JSON.parse(lastMessage.content.trim());

				setMessageList(data.message_list);
				setCurrentSuggestedReplies(parsedContent.suggested);
				addMessage({ text: parsedContent.response, uid: "bot" });
			}
		} catch (error) {
			console.error("Error handling chat interaction:", error);
		}
	};

	const initiateBooking = async (booking) => {
		try {
			await setBooking(booking); // assuming setBooking is asynchronous; if not, you can omit await here

			// Add a chat message in the chatbot after the booking is successful
			addMessage({
				text: `Booking successful! You'll shortly receive an email confirmation at ${session.user.email}.`,
				uid: "bot",
			});
		} catch (error) {
			console.error("Error initiating booking:", error);
			// Handle any errors that occur during the booking process
		}
	};

	const goBot = () => {
		dummy.current?.scrollIntoView({ behavior: "smooth" });
		setHidden(true);
	};

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
										style={{
											position: "absolute",
											top: "90%",
										}}
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
								}}
							>
								{data.text}
							</Alert>
						))}

						{currentSuggestedReplies && currentSuggestedReplies.length > 0 && (
							<Group position="center" style={{ marginBottom: "8px" }}>
								{currentSuggestedReplies.map((reply, index) => (
									<Button
										key={index}
										variant="outline"
										radius="xl"
										color="black"
										onClick={() => handleUserMessage(reply)}
									>
										{reply}
									</Button>
								))}
							</Group>
						)}

						{booking && ( //checkout stripe component
							<Checkout booking={booking} />
						)}
					</Stack>
					<ChatBox
						fn={goBot}
						addMessage={addMessage}
						onUserMessage={handleUserMessage}
					/>
				</>
			)}
		</>
	);
};

export default ChatRoom;

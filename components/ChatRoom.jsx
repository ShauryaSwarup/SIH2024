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

const ChatRoom = () => {
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

	// Fetch questions from the backend
	const fetchQuestions = async () => {
		try {
			const response = await axios.get("/api/questions");
			setQuestions(response.data);
			setLoading(false);
		} catch (error) {
			console.error("Failed to fetch questions:", error);
			setLoading(false);
		}
	};

	// Handle user message submission
	const handleUserMessage = (userMessage) => {
		setMes((prevMessages) => [
			...prevMessages,
			{ text: userMessage, uid: "user" },
		]);
		respondWithQuestion();
	};

	// Respond with a predefined question
	const respondWithQuestion = () => {
		if (questions.length > 0) {
			const randomQuestion =
				questions[Math.floor(Math.random() * questions.length)];
			setMes((prevMessages) => [
				...prevMessages,
				{ text: randomQuestion.text, uid: "bot" },
			]);
		}
		goBot();
	};

	function goBot() {
		dummy.current?.scrollIntoView({ behavior: "smooth" });
		setHidden(true);
		setId("");
	}

	return (
		<>
			{loading ? (
				<Loading />
			) : quota ? (
				<QuotaReached />
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
					<ChatBox fn={goBot} id={id} ruid={ruid} addMessage={addMessage} />
				</>
			)}
		</>
	);
};
export default ChatRoom;

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
import { ChevronDown } from "tabler-icons-react";
import ChatBox from "./ChatBox";
import ChatMessage from "./ChatMessage";
import Loading from "./Loading";
import NavBar from "./NavBar";
import { useInView } from "react-intersection-observer";

console.log("ChatMessage:", ChatMessage);

function ChatRoom() {
	const [mes, setMes] = useState([]);
	const [loading, setloading] = useState(true);
	const [quota, setQuota] = useState(false);
	const dummy = useRef(null);
	const [replyInfo, setReplyInfo] = useState([]);
	const [id, setId] = useState("");

	const hardcodedMessages = [
		{
			id: "1",
			text: "Hello, how are you?",
			uid: "user1",
			createdAt: new Date(),
			photoURL: "https://example.com/photo1.jpg",
			deleted: false,
			repliedTo: null,
			ruid: null,
			rtext: null,
		},
		{
			id: "2",
			text: "I am good, thanks! How about you?",
			uid: "user2",
			createdAt: new Date(),
			photoURL: "https://example.com/photo2.jpg",
			deleted: false,
			repliedTo: null,
			ruid: null,
			rtext: null,
		},
		// Add more messages as needed
	];

	useEffect(() => {
		setTimeout(() => {
			setMes(hardcodedMessages);
			setloading(false);
			setTimeout(() => {
				goBot();
			}, 300);
		}, 500);
		// eslint-disable-next-line
	}, []);

	function goBot() {
		dummy.current?.scrollIntoView({ behavior: "smooth" });
		setHidden(true);
		setId("");
	}

	const [ruid, setRuid] = useState("");
	function replyMessage(params) {
		const message = mes.find((msg) => msg.id === params.msgId);
		if (message) {
			getMessage(params.msgId);
			setRuid(params);
		}
	}

	const getMessage = (id) => {
		const message = mes.find((msg) => msg.id === id);
		if (message) {
			const reply = message.text;
			let name = message.uid === "user1" ? "yourself" : "User";
			setReplyInfo([{ text: reply, name: name }]);
			setId(id);
			setHidden(false);
		}
	};

	const [hidden, setHidden] = useState(true);
	const { ref, inView } = useInView({
		delay: 600,
		threshold: 1,
	});

	// Function to add a new message to the chat
	const addMessage = (newMessage) => {
		setMes((prevMessages) => [...prevMessages, newMessage]);
	};

	return (
		<>
			{loading ? (
				<Loading />
			) : quota ? (
				<div>QuotaReached</div>
			) : (
				<>
					<NavBar />
					<Stack
						sx={{ height: "84vh" }}
						p={0}
						style={{ backgroundColor: "lightpink" }}
					>
						<ScrollArea p="xs" scrollbarSize={1} sx={{ height: "84vh" }}>
							<Stack>
								<Group hidden={inView} position="center" pt="xs">
									<Paper
										shadow="md"
										radius="xl"
										withBorder
										p={0}
										sx={{ position: "absolute", top: "95%" }}
									>
										<ActionIcon color="violet" radius="xl" onClick={goBot}>
											<ChevronDown />
										</ActionIcon>
									</Paper>
								</Group>

								{mes.map((msg, id) => (
									<ChatMessage
										key={id}
										message={msg}
										replyMessage={replyMessage}
									/>
								))}
							</Stack>
							<div ref={ref}></div>
							<div ref={dummy}></div>
						</ScrollArea>

						{replyInfo.map((data, id) => (
							<Alert
								key={id}
								sx={{ minHeight: "10%" }}
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
					</Stack>
					<ChatBox fn={goBot} id={id} ruid={ruid} addMessage={addMessage} />
				</>
			)}
		</>
	);
}

export default ChatRoom;

import {
	ActionIcon,
	Alert,
	Avatar,
	Button,
	Card,
	Collapse,
	Group,
	Stack,
	Text,
	Tooltip,
} from "@mantine/core";
import { useState } from "react";
import { CornerUpLeft, Trash, Volume2 } from "tabler-icons-react";

export default function ChatMessage({
	message, // This will be the message object passed from ChatRoom
}) {
	const {
		text,
		uid,
		photoURL,
		deleted,
		repliedTo,
		ruid,
		rtext,
		color,
		msgDate,
	} = message; // Destructure the message object

	const [open, setOpen] = useState(false);

	const deleteMe = () => {
		// Functionality for delete
		console.log("Message deleted");
	};

	const reply = () => {
		// Functionality for reply
		console.log("Reply clicked");
	};

	const speakMessage = () => {
		const utterance = new SpeechSynthesisUtterance(text);
		utterance.pitch = 1;
		utterance.rate = 1;
		utterance.volume = 1;
		window.speechSynthesis.speak(utterance);
	};

	// Determine alignment based on user ID
	const isUserMessage = uid === "user"; // Assuming "user" is the current user's ID

	return (
		<Group
			justify={isUserMessage ? "right" : "left"} // Align based on message source
			align="flex-end"
			noWrap
			style={{ marginBottom: "8px" }}
		>
			{!isUserMessage && photoURL && (
				<Tooltip label={uid} position="right">
					<Avatar src={photoURL} radius="xl" />
				</Tooltip>
			)}
			<Stack
				p={0}
				spacing={2}
				style={{ maxWidth: "80%" }}
				align={isUserMessage ? "flex-end" : "flex-start"}
			>
				<Stack p={0} spacing={0} m={0} hidden={deleted || !repliedTo}>
					<Group
						align="center"
						justify={isUserMessage ? "right" : "left"}
						style={{ position: "relative", bottom: -8 }}
						p={0}
						spacing={0}
						m={0}
						noWrap
					>
						{/* Optional reply UI */}
					</Group>
				</Stack>
				<Group
					justify={isUserMessage ? "right" : "left"}
					spacing={3}
					align="center"
					noWrap
				>
					<Alert
						color={color || "#6c757d"}
						radius="lg"
						py={8}
						variant={deleted ? "outline" : "light"}
						onClick={() => setOpen((o) => !o)}
						style={{ textAlign: isUserMessage ? "right" : "left" }}
					>
						{deleted ? (
							<Text color={color || "#6c757d"} size="xs">
								Message removed
							</Text>
						) : (
							<div style={{ position: "relative" }}>
								<Text
								className="mb-2"
									style={{
										wordWrap: "break-word",
										whiteSpace: "pre-wrap",
										paddingBottom: "30px", // Add padding to ensure space for button
									}}
								>
									{text}
								</Text>
								<ActionIcon
									variant="outline"
									color="black"
									className=" "
									onClick={speakMessage}
									style={{
										position: "absolute",
										bottom: "8px",
										right: "8px",
									}}
								>
									<Volume2 size={16} />
								</ActionIcon>
							</div>
						)}
					</Alert>
				</Group>
				<Collapse in={open} px="xs">
					<Text
						size="xs"
						align={isUserMessage ? "right" : "left"}
						color="dimmed"
					>
						{msgDate}
					</Text>
				</Collapse>
				{message.type === "table" && (
					<Card
						shadow="xs"
						padding="md"
						radius="md"
						style={{ marginTop: "8px" }}
					>
						<table>
							<tbody>
								<tr>
									<td>Category 1:</td>
									<td>
										<input type="text" />
									</td>
								</tr>
								<tr>
									<td>Category 2:</td>
									<td>
										<input type="text" />
									</td>
								</tr>
								<tr>
									<td>Category 3:</td>
									<td>
										<input type="text" />
									</td>
								</tr>
								<tr>
									<td>Category 4:</td>
									<td>
										<input type="text" />
									</td>
								</tr>
							</tbody>
						</table>
					</Card>
				)}
				{message.suggestedReplies &&
					message.suggestedReplies.map((reply, index) => (
						<Button key={index} variant="outline" radius="xl">
							{reply}
						</Button>
					))}
				{/* Add Text-to-Speech Button */}
			</Stack>
		</Group>
	);
}

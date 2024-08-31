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
import { CornerUpLeft, Trash } from "tabler-icons-react";

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
						color={color || "blue"}
						radius="lg"
						py={8}
						variant={deleted ? "outline" : "light"}
						onClick={() => setOpen((o) => !o)}
						style={{ textAlign: isUserMessage ? "right" : "left" }}
					>
						{deleted ? (
							<Text color={color || "blue"} size="xs">
								Message removed
							</Text>
						) : (
							<Text
								style={{
									wordWrap: "break-word",
									whiteSpace: "pre-wrap",
								}}
							>
								{text}
							</Text>
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
			</Stack>
		</Group>
	);
}

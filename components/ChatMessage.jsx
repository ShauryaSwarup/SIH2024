import {
	ActionIcon,
	Alert,
	Avatar,
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
							text
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
			</Stack>
		</Group>
	);
}

import {
	ActionIcon,
	Alert,
	Avatar,
	Collapse,
	Group,
	Loader,
	Menu,
	Stack,
	Text,
	TooltipFloating,
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

	return (
		<Group
			position={uid === "user1" ? "right" : "left"} // Example logic for alignment
			align="flex-end"
			noWrap
		>
			<Stack p={0} spacing={2} style={{ maxWidth: "80%" }} align="flex-end">
				<Group position="right" align="flex-end" spacing="xs">
					<TooltipFloating label={uid} position="right">
						<Avatar src={photoURL} radius="xl" hidden={uid === "user1"} />
					</TooltipFloating>

					<Stack p={0} spacing={0} m={0}>
						<Stack p={0} spacing={0} m={0} hidden={deleted || !repliedTo}>
							<Group
								align="center"
								position="left"
								style={{ position: "relative", bottom: -8 }}
								p={0}
								spacing={0}
								m={0}
								noWrap
							>
							</Group>
						</Stack>
						<Group position="left" spacing={3} align="center" noWrap>
							<Alert
								color={color || "blue"}
								radius="lg"
								py={8}
								variant={deleted ? "outline" : "light"}
								onClick={() => {
									setOpen((o) => !o);
								}}
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
					</Stack>
				</Group>
				<Collapse in={open} px="xs">
					<Text size="xs" align="left" color="dimmed">
						{msgDate}
					</Text>
				</Collapse>
			</Stack>
		</Group>
	);
}

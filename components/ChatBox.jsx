"use client"
import { ActionIcon, Group, Stack, TextInput } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
import { useState } from "react";
import toast from "react-hot-toast";
import { MoodHappy, Send } from "tabler-icons-react";

const ChatBox = ({ fn, id, ruid, addMessage }) => {
	const [value, setValue] = useState("");
	const [user] = useState({
		uid: "user", // Example user ID
		photoURL: "https://example.com/photo1.jpg", // Example user photo
	});

	const sendMessage = () => {
		if (user) {
			if (value.length > 100) {
				toast.error("Must not exceed 100 characters");
				setValue("");
			} else {
				const newMessage = {
					id: Math.random().toString(36).substr(2, 9), // Unique ID for the message
					text: value,
					createdAt: new Date(), // Use the current date for simulation
					uid: user.uid,
					photoURL: user.photoURL,
					deleted: false,
					repliedTo: id || null,
					ruid: ruid ? ruid.senderUid : null,
					rtext: ruid ? ruid.msgText : null,
				};

				// Add the new message to the parent component's state
				addMessage(newMessage);

				// Clear the input field and scroll to the bottom
				setValue("");
				fn(); // Call the goBot function to scroll to the bottom
			}
		}
	};

	return (
		<Stack
			style={{ height: "8vh" }}
			justify="center"
			p={0}
		>
			<Group position="right" p="xs">
				<TextInput
					value={value}
					onChange={(event) => setValue(event.currentTarget.value)}
					style={{ flexGrow: 1 }}
					placeholder="Say something nice . . . "
					rightSection={
						<ActionIcon
							onClick={() =>
								toast("Display only hehe", {
									icon: "😁",
								})
							}
						>
							<MoodHappy />
						</ActionIcon>
					}
					onKeyDown={
						!/\S/.test(value)
							? undefined
							: value.length < 2
							? undefined
							: getHotkeyHandler([["Enter", sendMessage]])
					}
				/>
				<ActionIcon
					onClick={sendMessage}
					variant="hover"
					size="lg"
					disabled={!/\S/.test(value) || value.length < 2}
				>
					<Send />
				</ActionIcon>
			</Group>
		</Stack>
	);
};

export default ChatBox;

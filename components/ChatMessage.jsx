import React, { useState } from "react";
import {
	Avatar,
	Group,
	Stack,
	Text,
	Alert,
	Collapse,
	ActionIcon,
	Menu,
} from "@mantine/core";
import { CornerUpLeft, Trash, DotsVertical } from "tabler-icons-react";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import toast from "react-hot-toast";

dayjs.extend(calendar);

const ChatMessage = (props) => {
	const {
		text,
		uid,
		photoURL,
		createdAt,
		id,
		deleted,
		repliedTo,
		ruid,
		rtext,
	} = props.message;

	const [msgDate, setMsgDate] = useState("");
	const [hovered, setHovered] = useState(false);
	const [opened, setOpen] = useState(false);
	const [repDel, setRepDel] = useState(false);

	useState(() => {
		if (createdAt != null) {
			conditions();
		} else {
			setMsgDate("Just now");
		}
	}, [createdAt]);

	function conditions() {
		if (dayjs().diff(dayjs.unix(createdAt.seconds), "h") > 48) {
			setMsgDate(dayjs.unix(createdAt.seconds).format("MMMM D, YYYY h:mm A"));
		} else {
			setMsgDate(dayjs.unix(createdAt.seconds).calendar());
		}
	}

	function deleteMe() {
		if (uid === "user1") {
			// Replace with your hardcoded user ID
			// Simulate deletion
			setRepDel(true);
		} else {
			toast.error("This is not yours.");
		}
	}

	function reply() {
		props.replyMessage({ msgId: id, senderUid: uid, msgText: text });
	}

	const message = uid === "user1" ? "right" : "left"; // Replace 'user1' with the current user ID
	let color = message === "right" ? "yellow" : "indigo";

	return (
		<Group
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			position={message}
			align="flex-end"
			noWrap
		>
			<Stack
				p={0}
				spacing={2}
				sx={{ maxWidth: "80%" }}
				align="flex-end"
				style={{ backgroundColor: "lightgreen" }}
			>
				<Group position={message} align="flex-end" spacing="xs">
					<Avatar src={photoURL} radius="xl" hidden={message === "right"} />
					<Stack p={0} spacing={0} m={0}>
						<Stack
							p={0}
							spacing={0}
							m={0}
							hidden={deleted === undefined ? repliedTo === undefined : true}
						>
							<Group
								align="center"
								position={message}
								style={{ position: "relative", bottom: -8 }}
								p={0}
								spacing={0}
								m={0}
								noWrap
							>
								<CornerUpLeft size={15} />
								<Text size="xs" align={message} p={0}>
									{uid === "user1" ? "You" : "Sender"} replied to{" "}
									{ruid === uid ? "yourself" : "someone"}
								</Text>
							</Group>
							<Group position={message}>
								<Alert
									sx={{ bottom: "-10px", zIndex: -1 }}
									color="gray"
									variant={repDel === false ? "light" : "outline"}
									radius="lg"
									py={8}
								>
									{repDel === false ? (
										rtext
									) : (
										<Text color="gray" size="xs">
											Message removed
										</Text>
									)}
								</Alert>
							</Group>
						</Stack>
						<Group position={message} spacing={3} align="center" noWrap>
							{hovered ? (
								<Menu
									position="top"
									placement="center"
									size="xs"
									hidden={message === "left"}
									control={
										<ActionIcon radius="xl" color="dark">
											<DotsVertical size={20} />
										</ActionIcon>
									}
								>
									<Menu.Item
										onClick={() => deleteMe()}
										color="red"
										icon={<Trash size={14} />}
									>
										Delete
									</Menu.Item>
									<Menu.Item
										onClick={() => reply()}
										icon={<CornerUpLeft size={14} />}
									>
										Reply
									</Menu.Item>
								</Menu>
							) : null}
							<Alert
								sx={{}}
								color={color}
								radius="lg"
								py={8}
								variant={deleted === undefined ? "light" : "outline"}
								onClick={() => {
									setOpen((o) => !o);
								}}
							>
								{deleted === undefined ? (
									text
								) : (
									<Text color={color} size="xs">
										Message removed
									</Text>
								)}
							</Alert>
							{hovered ? (
								<Menu
									position="top"
									placement="center"
									hidden={message === "right"}
									size="xs"
									control={
										<ActionIcon radius="xl" color="dark">
											<DotsVertical size={20} />
										</ActionIcon>
									}
								>
									<Menu.Item
										onClick={() => deleteMe()}
										color="red"
										icon={<Trash size={14} />}
									>
										Delete
									</Menu.Item>
									<Menu.Item
										onClick={() => reply()}
										icon={<CornerUpLeft size={14} />}
									>
										Reply
									</Menu.Item>
								</Menu>
							) : null}
						</Group>
					</Stack>
				</Group>
				<Collapse in={opened} px="xs">
					<Text size="xs" align={message} color="dimmed">
						{msgDate}
					</Text>
				</Collapse>
			</Stack>
		</Group>
	);
};

export default ChatMessage;

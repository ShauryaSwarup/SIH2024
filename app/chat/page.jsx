import ChatRoom from "@/components/Chat/ChatRoom";
import { Container } from "@mantine/core";
import React from "react";

function page() {
	return (
		<Container
			p={0}
			sx={{
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<ChatRoom />
		</Container>
	);
}

export default page;
import React from "react";
import {
	Avatar,
	Group,
	Paper,
	Text,
	Title,
	UnstyledButton,
} from "@mantine/core";
import { MessageCircle } from "tabler-icons-react";
import { useSession } from "next-auth/react";

const NavBar = () => {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return <div>Loading...</div>;
	}

	if (!session) {
		return <div>Please sign in to access the chat.</div>;
	}

	return (
		<Paper
			radius={0}
			style={{ boxShadow: "0px 2px 0px 0px rgba(173,181,189,.5)" }}
			// style={{ backgroundColor: "lightblue" }}
		>
			<Group
				position="apart"
				p="sm"
				align="center"
				justify="center"
				style={{ height: "10vh", alignItems: "center" }}
				noWrap
			>
				<Avatar
					// component={Link}
					to={`/user/1`} // Replace with hardcoded user ID
					src={session.user.image} // Replace with hardcoded photo URL
					radius="xl"
				/>
				<Text
					variant="gradient"
					gradient={{ from: "grape", to: "cyan", deg: 90 }}
				>
					<Group align="center" noWrap spacing={3}>
						<UnstyledButton>
							<Title>{session.user.name}</Title>
						</UnstyledButton>
						<MessageCircle color="#4dabf7" size={30} />
					</Group>
				</Text>
				{/* <DarkMode /> */}
			</Group>
		</Paper>
	);
};

export default NavBar;

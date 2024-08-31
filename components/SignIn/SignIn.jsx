import { Button, Group, Paper, Text, Title } from "@mantine/core";
import NextImage from "next/image";
import { signIn } from "@/auth";

export default function SignIn() {
	return (
		<Group position="center" style={{ minHeight: "80vh" }}>
			<Paper withBorder shadow="md" p={30} radius="md">
				<Group position="center" mb="lg">
					<NextImage
						src="/images/exhibition.png" // Ensure the path is correct
						alt="Sign in illustration"
						width={150}
						height={150}
						layout="intrinsic"
						style={{ display: "block" }} // Center the image
            className="mx-auto"
					/>
				</Group>
				<Title order={2} align="center" mb="md">
					Sarathi
				</Title>
				<Text align="center" mb="lg">
					Sign in with your Google account to continue
				</Text>
				<form
					action={async () => {
						"use server";
						await signIn();
					}}
				>
					<Button type="submit" fullWidth variant="filled" color="black">
						Sign in
					</Button>
				</form>
			</Paper>
		</Group>
	);
}

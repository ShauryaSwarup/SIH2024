import { auth } from "@/auth";
import SignIn from "@/components/SignIn/SignIn";
import { SignOut } from "@/components/SignOut/SignOut";
import UserAvatar from "@/components/User/UserAvatar";
import { UnstyledButton } from "@mantine/core";
import React from "react";

async function ProfileBrief() {
	const session = await auth();
	return (
		<UnstyledButton>
			{session ? (
				<>
					<UserAvatar />
					<SignOut />
					<div>{session.user.role}</div>
				</>
			) : (
				<SignIn />
			)}
		</UnstyledButton>
	);
}

export default ProfileBrief;

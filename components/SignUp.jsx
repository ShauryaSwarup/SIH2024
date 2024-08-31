import { auth } from "@/auth";
import SignIn from "@/components/SignIn/SignIn";
import { SignOut } from "@/components/SignOut/SignOut";
import UserAvatar from "@/components/User/UserAvatar";
import React from "react";

async function SignUp() {
	const session = await auth();
	return (
		<>
			{session ? (
				<>
					<UserAvatar />
					<SignOut />
					<div className="text-white">{session.user.name}</div>
				</>
			) : (
				<SignIn />
			)}
		</>
	);
}

export default SignUp;

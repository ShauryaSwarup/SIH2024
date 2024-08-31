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
					<div>{session.user.name}</div>
				</>
			) : (
				<SignIn />
			)}
			<div className=" bg-black text-blue-50">hello</div>
		</>
	);
}

export default SignUp;

"use client";

import React, { useEffect, useState } from "react";
import { auth, signIn, signOut } from "@/auth";
import UserAvatar from "@/components/User/UserAvatar";
import { UnstyledButton, Loader } from "@mantine/core";

function ProfileBrief() {
	const [session, setSession] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchSession = async () => {
			try {
				const sessionData = await auth();
				setSession(sessionData);
			} catch (error) {
				console.error("Failed to fetch session:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchSession();
	}, []);

	const handleSignIn = async (e) => {
		e.preventDefault();
		await signIn();
	};

	const handleSignOut = async (e) => {
		e.preventDefault();
		await signOut();
	};

	if (loading) {
		return <Loader />;
	}

	return (
		<UnstyledButton>
			{session ? (
				<>
					<UserAvatar />
					<form onSubmit={handleSignOut}>
						<button type="submit">Sign Out</button>
					</form>
					<div>{session.user.role}</div>
				</>
			) : (
				<form onSubmit={handleSignIn}>
					<button type="submit">Sign in with Google</button>
				</form>
			)}
		</UnstyledButton>
	);
}

export default ProfileBrief;

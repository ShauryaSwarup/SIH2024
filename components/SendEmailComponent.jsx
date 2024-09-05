"use client";
import { useState, useEffect } from "react";
import { Alert } from "@mantine/core";
import { IconCheck, IconAlertCircle } from "@tabler/icons-react";

export default function SendEmailComponent({ emailData, success }) {
	const [emailStatus, setEmailStatus] = useState(null);

	useEffect(() => {
		if (success) {
			sendEmail();
		}
	}, [success]);

	const sendEmail = async () => {
		try {
			const response = await fetch("/api/send-email", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					to: emailData.to,
					subject: emailData.subject,
					text: emailData.text,
				}),
			});

			const result = await response.json();

			if (result.success) {
				setEmailStatus(true);
			} else {
				setEmailStatus(false);
			}
		} catch (error) {
			console.error("Error sending email:", error);
			setEmailStatus(false);
		}
	};

	return (
		<div>
			{emailStatus === true && (
				<Alert icon={<IconCheck size={16} />} title="Success" color="green">
					Email Sent Successfully!
				</Alert>
			)}

			{emailStatus === false && (
				<Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
					Failed to send email.
				</Alert>
			)}
		</div>
	);
}

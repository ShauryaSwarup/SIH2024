import { useEffect } from "react";

function SendEmail() {
	const text = `Your large text here`;

	useEffect(() => {
		// After the component is fully rendered, send the email
		const sendEmailConfirmation = async () => {
			try {
				const response = await fetch("/api/send-email", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: "narayanibokde232@gmail.com", // Replace with the recipient's email
						subject: "Text Displayed Successfully",
						message: "The text has been successfully displayed.",
					}),
				});

				if (response.ok) {
					console.log("Email sent successfully");
				} else {
					console.error("Failed to send email");
				}
			} catch (error) {
				console.error("Error:", error);
			}
		};

		sendEmailConfirmation();
	}, [text]); // Trigger effect when text changes or is set

	return (
		<div>
			{/* Your Alert component or any other UI component displaying the text */}
			<Alert /* other props */>{text}</Alert>
		</div>
	);
}

export default SendEmail;

import nodemailer from "nodemailer";

export async function POST(request) {
	try {
		const { to, subject, text } = await request.json();

		// Create a transporter using your email provider's SMTP settings
		const transporter = nodemailer.createTransport({
			service: "gmail", // for example, using Gmail
			auth: {
				user: process.env.EMAIL_USER, // your email
				pass: process.env.EMAIL_PASSWORD, // your email password or an app-specific password
			},
		});

		// Set up email data
		const mailOptions = {
			from: process.env.EMAIL_USER, // sender address
			to, // list of receivers
			subject, // Subject line
			text, // plain text body
		};

		// Send the email
		await transporter.sendMail(mailOptions);

		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		console.error("Failed to send email:", error);
		return new Response(
			JSON.stringify({ success: false, error: error.message }),
			{ status: 500 }
		);
	}
}

// pages/api/seed.js
export default async function handler(req, res) {
	const questions = [
		{ text: "What is the capital of France?" },
		{ text: "Who wrote 'Pride and Prejudice'?" },
		{ text: "What is the square root of 144?" },
		{ text: "What is the chemical symbol for gold?" },
		{ text: "Who painted the Mona Lisa?" },
	];

	for (const question of questions) {
		await fetch("http://localhost:3000/api/questions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(question),
		});
	}

	res.status(200).json({ message: "Seeded questions!" });
}

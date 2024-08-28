// pages/api/questions/index.js
import connectMongo from "../../../lib/mongodb";
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
	text: { type: String, required: true },
});

const Question =
	mongoose.models.Question || mongoose.model("Question", questionSchema);

export default async function handler(req, res) {
	const { method } = req;

	await connectMongo();

	switch (method) {
		case "GET":
			try {
				const questions = await Question.find();
				res.status(200).json(questions);
			} catch (error) {
				res.status(500).json({ message: "Failed to load questions" });
			}
			break;

		case "POST":
			try {
				const question = new Question({ text: req.body.text });
				const newQuestion = await question.save();
				res.status(201).json(newQuestion);
			} catch (error) {
				res.status(400).json({ message: "Failed to create question" });
			}
			break;

		default:
			res.setHeader("Allow", ["GET", "POST"]);
			res.status(405).end(`Method ${method} Not Allowed`);
			break;
	}
}

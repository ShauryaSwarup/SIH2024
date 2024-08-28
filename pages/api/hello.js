import connectMongo from "../../lib/mongodb";

export default async function handler(req, res) {
	await connectMongo();

	res.status(200).json({ message: "Hello from MongoDB!" });
}

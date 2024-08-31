import Razorpay from "razorpay";
import { v4 as uuidv4 } from "uuid";

// Initialize Razorpay instance
const razorpay = new Razorpay({
	key_id: process.env.RAZORPAY_KEY_ID,
	key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
	if (req.method === "POST") {
		try {
			const { amount, currency } = req.body;

			// Create a new Razorpay order
			const options = {
				amount: amount * 100, // amount in the smallest unit of currency (e.g., cents)
				currency: currency,
				receipt: uuidv4(), // unique receipt ID
			};

			const order = await razorpay.orders.create(options);

			res.status(200).json({
				id: order.id,
				currency: order.currency,
				amount: order.amount,
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}

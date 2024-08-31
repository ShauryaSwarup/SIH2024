const mongoose = require("mongoose");
// require("dotenv").config({ path: ".env.local" });

const connectMongo = async () => {
	if (mongoose.connections[0].readyState) {
		// If already connected, do nothing
		return;
	}
	// Connect to MongoDB
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("Failed to connect to MongoDB", error);
		throw error;
	}
};

module.exports = connectMongo;

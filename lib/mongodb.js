import mongoose from "mongoose";

const connectMongo = async () => {
	if (mongoose.connections[0].readyState) {
		// If already connected, do nothing
		return;
	}
	// Otherwise, connect to the database
	await mongoose.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	console.log("Connected to MongoDB");
};

export default connectMongo;

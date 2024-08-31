const { MongoClient } = require("mongodb");
// require("dotenv").config({ path: ".env.local" });
const URI = process.env.MONGODB_URI;
const options = {};

if (!URI) throw new Error("Please add your Mongo URI to .env.local");

let client = new MongoClient(URI, options);
let clientPromise;
if (process.env.NODE_ENV !== "production") {
	if (!global._mongoClientPromise) {
		global._mongoClientPromise = client.connect();
	}
	clientPromise = global._mongoClientPromise;
} else {
	clientPromise = client.connect();
}

module.exports = clientPromise;

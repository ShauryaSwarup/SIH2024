import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
  emailVerified: {
    type: Boolean,
    default: null,
  },
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;

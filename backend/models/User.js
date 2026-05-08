import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
  },

  photo: {
    type: String,
  },

  googleId: {
    type: String,
  },

  githubId: {
    type: String,
  },
});

export default mongoose.model("User", userSchema);
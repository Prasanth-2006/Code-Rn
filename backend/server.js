import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/contact", contactRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.json({
      message: "Signup successful",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

app.post("/google-login", async (req, res) => {
  try {
    const { name, email, photo, uid } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        username: name,
        email,
        photo,
        googleId: uid,
        password: "GOOGLE_AUTH",
      });

      await user.save();
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Google login failed",
    });
  }
});

app.post("/github-login", async (req, res) => {
  try {
    const { name, email, photo, uid } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        username: name,
        email,
        photo,
        githubId: uid,
        password: "GITHUB_AUTH",
      });

      await user.save();
    }

    res.json({
      success: true,
      user,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "GitHub login failed",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    res.json({
      message: "Login successful",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on port ${process.env.PORT}`
  );
});
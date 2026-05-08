import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

router.post("/", async (req, res) => {

  try {

    console.log("BODY RECEIVED:");
    console.log(req.body);

    const contact = await Contact.create({
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
    });

    console.log("SAVED:", contact);

    res.status(201).json({
      success: true,
      contact,
    });

  } catch (error) {

    console.log("ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
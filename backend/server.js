7Lconst dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Message = require('./model/Message');

const app = express();

// ✅ Environment variables
const port = 4000;
const mongoURI = mongodb+srv://spac:00134679@cluster0.skilhfa.mongodb.net/birthdayDB?retryWrites=true&w=majority&appName=Cluster0
// ✅ Check if MongoDB URI exists
if (!mongoURI) {
  console.error("❌ Error: MONGODB_URI environment variable is not set!");
  process.exit(1);
}

// ✅ Middleware
app.use(cors({
  origin:"https://birthday-wish-ghd9.onrender.com/" ,
  credentials: true,
}));
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log("✅ Connected to MongoDB");
});

mongoose.connection.on('error', (err) => {
  console.error("❌ MongoDB connection error:", err);
});

// ✅ Routes
app.get("/", (req, res) => {
  res.send("🎉 Birthday API is running!");
});

// Get all messages
app.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error("❌ Error fetching messages:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// Post a new message
app.post("/messages", async (req, res) => {
  try {
    const { name, message } = req.body;
    if (!name || !message) {
      return res.status(400).json({ error: "Name and message are required" });
    }

    const newMsg = await Message.create({ name, message });
    res.json(newMsg);
  } catch (err) {
    console.error("❌ Error posting message:", err);
    res.status(500).json({ error: "Failed to post message" });
  }
});

// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

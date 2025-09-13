const express = require('express');
const cors = require('cors');
const Message = require("./model/Message");
const mongoose = require('mongoose');

// Environment variables
const port = process.env.PORT || 4000;
const mongoURI = process.env.MONGODB_URI;
const frontendUrl = process.env.FRONTEND_URL || 
  "https://birthday-wish-gkch.onrender.com/"                

const app = express();

             
app.use(cors({
  credentials: true,
  origin: frontendUrl,
}));
app.use(express.json());

                     
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

// Middleware
app.use(cors({
  credentials: true,
  origin: frontendUrl,
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));
mongoose.connection.on('error', (err) => console.error('MongoDB error', err));

             

                   
app.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error("/ API Routes")}

// Get all messages
app.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

                     
app.post("/messages", async (req, res) => {
  try {
    const { name, message } = req.body;
    if (!name || !message) {
      return res.status(400).json({ error: "Name and message are required" });
    }
    const newMsg = await Message.create({ name, message });
    res.json(newMsg);
  } catch (err) {
    console.error('// Post a new message
app.post("/messages", async (req, res) => {
  try {
    const { name, message } = req.body;
    if (!name || !message) {
      return res.status(400).json({ error: "Name and message are required" });
    }
    const newMsg = await Message.create({ name, message });
    res.json(newMsg);
  } catch (err) {
    console.error('Error posting message:', err);
    res.status(500).json({ error: "Failed to post message" });
  }
});

// Server startup
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

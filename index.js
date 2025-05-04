const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// 👉 Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://fidowahyu567:Fido2005@tutam9sbdfido.xl3qe3v.mongodb.net/?retryWrites=true&w=majority&appName=tutam9sbdfido');
    console.log('✅ Connected to MongoDB <Fido>');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Exit on failure
  }
};

connectDB();

// 👉 Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 👉 Routes
app.use('/api/todos', require('./routes/todos'));

// 👉 Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

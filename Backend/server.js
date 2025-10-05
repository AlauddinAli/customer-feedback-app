
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://customer-feedbackapp.netlify.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Error:', err));

// Import Routes
const authRoutes = require('./routes/auth');
const feedbackRoutes = require('./routes/feedback');

// Use Routes
app.use('/auth', authRoutes);
app.use('/feedback', feedbackRoutes);

// Server
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running!' });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

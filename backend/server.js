const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const itemRoutes = require('./routes/itemRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/items', itemRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/crud', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});



// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));

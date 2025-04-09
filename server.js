require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
app.use('/', authRoutes);

const port = 5001;
app.listen(port, () => console.log(`🚀 Auth Service running on port ${port}`));

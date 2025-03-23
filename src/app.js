const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
import orderRoutes from './routes/orderRoutes.js';
import assignmentRoutes from './routes/assignmentRoutes.js';
import carrierRoutes from './routes/carrierRoutes.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api', orderRoutes);
app.use('/api', assignmentRoutes);
app.use('/api', carrierRoutes);

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

module.exports = app;
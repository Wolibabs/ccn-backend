const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/admin.routes');
const userRoutes = require('./routes/user.routes');
const errorHandler = require('./utils/errorHandler');


dotenv.config();
connectDB();


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/auth', adminRoutes);
app.use('/api', userRoutes);


app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
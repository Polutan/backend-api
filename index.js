const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// import routes
const authRoute = require('./routes/auth');
const predictRoute = require('./routes/predict');
const verifyToken = require('./routes/verifyToken');

dotenv.config();

//connect to database
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log('Connected to the database')
);

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

//routes middleware
app.use('/api/user', authRoute);
app.use('/api/predict', verifyToken, predictRoute);


app.listen(8080, () => console.log('Server is Up and running'));


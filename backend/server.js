const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dbConnect = require('./src/config/db');

// Import routers
const userRouter = require('./src/v1/routers/userRouter');
const locationRouter = require('./src/v1/routers/locationRouter');
const accommodationRouter = require('./src/v1/routers/accommodationRouter');
const restaurantRouter = require('./src/v1/routers/restaurantRouter');
const touristAttractionRouter = require('./src/v1/routers/touristAttractionRouter');

const app = express();

// Configurations
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json());
app.use(cookieParser());
require('dotenv').config();
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));

// DB connect
dbConnect();

// API routes
app.use('/api/user', userRouter)
app.use('/api/location', locationRouter)
app.use('/api/accommodation', accommodationRouter)
app.use('/api/restaurant', restaurantRouter)
app.use('/api/tourist-attraction', touristAttractionRouter)

// Home route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Start server
app.listen(port, () => {
    console.log(`App running on port: ${port}`);
});
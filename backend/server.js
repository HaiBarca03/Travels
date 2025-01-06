const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const dbConnect = require('./src/config/db')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

// Import routers
const userRouter = require('./src/v1/routers/userRouter')
const locationRouter = require('./src/v1/routers/locationRouter')
const accommodationRouter = require('./src/v1/routers/accommodationRouter')
const restaurantRouter = require('./src/v1/routers/restaurantRouter')
const touristAttractionRouter = require('./src/v1/routers/touristAttractionRouter')
const tourRouter = require('./src/v1/routers/tourRouter')
const favoriteRouter = require('./src/v1/routers/favoriteRoute')
const bookingRouter = require('./src/v1/routers/bookingRouter')
const orderRouter = require('./src/v1/routers/orderRouter')
const feedbackRouter = require('./src/v1/routers/feedbackRouter')

const app = express()

// Configurations
const port = process.env.PORT || 4000
app.use(express.json())
app.use(express.json({ limit: '50mb' }))
app.use(bodyParser.json())
app.use(cookieParser())
require('dotenv').config()
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}

app.use(cors(corsOptions))

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Travel API',
      version: '1.0.0',
      description: 'API documentation for the Travel application'
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Local server'
      }
    ]
  },
  apis: ['./src/v1/routers/*.js']
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// DB connect
dbConnect()

// API routes
app.use('/api/user', userRouter)
app.use('/api/location', locationRouter)
app.use('/api/accommodation', accommodationRouter)
app.use('/api/restaurant', restaurantRouter)
app.use('/api/tourist-attraction', touristAttractionRouter)
app.use('/api/tour', tourRouter)
app.use('/api/favorite', favoriteRouter)
app.use('/api/booking', bookingRouter)
app.use('/api/order', orderRouter)
app.use('/api/feedback', feedbackRouter)

// Home route
app.get('/', (req, res) => {
  res.send('Hello World')
})

// Start server
app.listen(port, () => {
  console.log(`App running on port: ${port}`)
})

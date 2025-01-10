require('dotenv').config()
const mongoose = require('mongoose')

const DATABASE = process.env.DB_CONNECT

const dbConnect = async () => {
  try {
    await mongoose.connect(DATABASE)
    console.log('Database connected successfully')
  } catch (error) {
    console.error('Database connection failed:', error.message)
    process.exit(1)
  }
}

module.exports = dbConnect

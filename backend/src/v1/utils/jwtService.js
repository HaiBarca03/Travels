const jwt = require('jsonwebtoken')
require('dotenv').config()

const genneralToken = async (payload) => {
    // console.log('payload', payload)
    const token = jwt.sign({
        ...payload
    }, process.env.TOKEN, { expiresIn: '1d' })

    return token
}

module.exports = {
    genneralToken,
}
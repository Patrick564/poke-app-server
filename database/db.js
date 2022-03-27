require('dotenv').config()
const fastifyPlugin = require('fastify-plugin')
const mongoose = require('mongoose')

const User = require('../schemas/userSchema.js')

const connector = async (fastify, options) => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('Database connected...')
    })

    await mongoose.connect(
      process.env.MONGO_ATLAS_URL,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )

    fastify.decorate('db', { User })
  } catch (error) {
    console.error(error.message)
  }
}

module.exports = fastifyPlugin(connector)

require('dotenv').config()
const mongoose = require('mongoose')
const fastifyPlugin = require('fastify-plugin')

const connector = async (fastify, options) => {
  try {
    await mongoose.connect(
      process.env.MONGO_ATLAS_URL,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )

    console.info('Database connection successful...')
  } catch (error) {
    console.error(error.message)
  }
}

module.exports = fastifyPlugin(connector)

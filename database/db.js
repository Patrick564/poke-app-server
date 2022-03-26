const mongoose = require('mongoose')
const fastifyPlugin = require('fastify-plugin')

const connector = async (fastify, options) => {
  try {
    await mongoose.connect(
      'mongodb+srv://pokeapp:2KIjwGsRDo4mbu3z@cluster0.3htrq.mongodb.net/pokeapp?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true }
    )

    console.info('Database connection successful...')
  } catch (error) {
    console.error(error.message)
  }
}

module.exports = fastifyPlugin(connector)

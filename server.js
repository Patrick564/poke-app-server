const server = require('./app.js')({
  logger: {
    level: 'info',
    prettyPrint: true
  }
})

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || '127.0.0.1'

const start = async () => {
  try {
    await server.listen(PORT, HOST)
  } catch (error) {
    server.log.error(error)
    process.exit(1)
  }
}

start()

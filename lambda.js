const awsLambdaFastify = require('aws-lambda-fastify')
const init = require('./server.js')

const proxy = awsLambdaFastify(init)

exports.handler = proxy

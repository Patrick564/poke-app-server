const userModel = require('../schemas/userSchema.js')

const route = {
  url: '/api/user/register',
  method: 'POST',
  handler: async (request, reply) => {
    const { id, name, email, picture } = request.body
    const user = await userModel.create({ gid: id, name, email, picture })

    reply.send({ gid: id, id: user._id, status: 'Successful' })
  }
}

module.exports = route

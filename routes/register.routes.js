const route = {
  url: '/api/user',
  method: 'GET',
  handler: async (req, rep) => {
    return { a: 'eeee' }
  }
}

module.exports = route

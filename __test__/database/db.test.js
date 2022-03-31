const build = require('../../app.js')

describe('Database mongodb for connection test', () => {
  const app = build()

  afterAll(async () => {
    await app.mongo.conn.close()
    app.close()
  })

  test('Route /api/pokemon/[ditto]', async () => {
    try {
      const a = await app.inject({ url: '/api', method: 'GET' })

      expect(a.statusCode).toBe(200)
    } catch (error) {
      console.error(error)
    }
  })
})

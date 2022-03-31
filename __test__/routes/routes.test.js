const build = require('../../app.js')

describe('Pokemon routes test [ GET /api/pokemon | /api/pokemon/list ]', () => {
  const app = build()

  afterAll(async () => {
    await app.mongo.conn.close()
    app.close()
  })

  test('Route /api/pokemon/[ditto]', async () => {
    try {
      const request = await app.inject({ url: '/api/pokemon/ditto', method: 'GET' })

      expect(request.statusCode).toBe(200)
    } catch (error) {
      console.error(error)
    }
  })

  test('Route /api/pokemon/list[?next=20]', async () => {
    try {
      const list = await app.inject({ url: '/api/pokemon/list', method: 'GET' })
      const nextList = await app.inject({ url: '/api/pokemon/list?next=20', method: 'GET' })

      expect(list.statusCode).toBe(200)
      expect(nextList.statusCode).toBe(200)
    } catch (error) {
      console.error(error)
    }
  })
})

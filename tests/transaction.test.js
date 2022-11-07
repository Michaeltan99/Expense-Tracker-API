const request = require('supertest')
const app = require('./server')

afterAll((done) => {
    done()
})

describe('Transaction', () => {
    test('List Transaction', async () => {
        const res = await request(app).get('/api/trans/list')

        expect(res.status).toBe(200)
    })
})
const request = require('supertest')
const app = require('./server')

afterAll((done) => {
    done()
})

describe('Auth', () => {
    test('Login API', async () => {
        const res = await request(app).post('/api/login').send({name: "Andi", password:"andi123"})

        expect(res.status).toBe(200)
    })
})
const app = require("../app");
const supertest = require("supertest");
const request = supertest(app)

it('GET /api Gets api landing page route', async () => {
    const res = await request.get('/api')
    //const res = request(app).get('/api');
    expect(res.status).toBe(200);
})

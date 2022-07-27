const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);

describe('GET /orders/:username', () => {
    it('GET / Receives all orders for a specific user from db', async () => {
        const res = await request.get('/api/orders/1')
        expect(res.status).toBe(200)
        expect(res.body).toBeDefined(); 
    });
    it('GET / Returns not found if no orders are found from db', async () => {
        const res = await request.get('/api/orders/100')
        expect(res.status).toBe(404)
    });
});

describe('POST /orders/:username', () => {
    it('POST / Receives all orders for a specific user from db', async () => {
        const res = await request.post('/api/orders/1').send({
            product_ids: [5, 8], sizes: [10, 6], customer_id: 1
        })
        expect(res.status).toBe(200)
    });
});
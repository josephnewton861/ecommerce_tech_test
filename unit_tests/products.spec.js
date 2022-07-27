const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);

describe('GET /products', () => {
    it('GET / Receives all products from db', async () => {
        const res = await request.get('/api/products')
        expect(res.status).toBe(200)
        expect(res.body).toBeDefined(); 
    });
});

describe('GET /products/:category', () => {
    it('GET / Receives products from a specific category from db', async () => {
        const res = await request.get('/api/products/lifestyle')
        expect(res.status).toBe(200)
        expect(res.body).toBeDefined(); 
    });
    it('GET / Returns not found on a category that does not exist', async () => {
        const res = await request.get('/api/products/test')
        expect(res.status).toBe(404)
    });
});

describe('GET /products/:category/:slug', () => {
    it('GET / Receives a specific product from a specific category from the db', async () => {
        const res = await request.get('/api/products/lifestyle/rally-pro-black-cm100018m')
        expect(res.status).toBe(200)
        expect(res.body).toBeDefined(); 
    });
    it('GET / Returns not found on a category that does not exist in the db', async () => {
        const res = await request.get('/api/products/test/rally-pro-black-cm100018m')
        expect(res.status).toBe(404);
    });
    it('GET / Returns not found on a slug that does not exist in the db', async () => {
        const res = await request.get('/api/products/lifestyle/test')
        expect(res.status).toBe(404);
    });
});
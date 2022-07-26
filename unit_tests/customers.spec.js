const app = require("../app");
const supertest = require("supertest");
const request = supertest(app)
const {testPassword} = require('../db/connection');

describe('GET /customer', () => {
    it('GET /customers Retrieves user information if present in db', async () => {
        const res = await request.get('/api/customer').send(
            {username: 'test123', password: testPassword, email: 'joe@email.com'}
        )
        expect(res.status).toBe(200)
        expect(res.body.customer[0].username).toBe('test123')    
    });
    
    it('GET /customers Returns not found if user information is not present in db', async () => {
        const res = await request.get('/api/customer').send(
            {username: 'test1234', password: testPassword, email: 'joes@email.com'}
        )
        expect(res.status).toBe(404)
        expect(res.body.msg).toEqual('Username: test1234 / email: joes@email.com and or password not found');
    });
    
    it('GET /customers Returns bad request if password or email is imputted incorrectly', async () => {
        const res = await request.get('/api/customer').send(
            {username: 'test123', password: 'test', email: 'joes@.com'}
        )
        expect(res.status).toBe(400);
        expect(res.body.msg).toEqual('bad request');
    });
})

describe('POST /customer', () => {
    it('GET /customers Retrieves user information if present in db', async () => {
        const res = await request.post('/api/customer').send(
            {username: 'test1234', password: testPassword, address: '181 test street', email: 'joe@email.com', postcode: 'test2345'}
        )
        expect(res.status).toBe(200)
        expect(res.body.msg).toBe('Successful registration');   
    });

    //username, password, address, email, postcode
    
    // it('GET /customers Returns not found if user information is not present in db', async () => {
    //     const res = await request.get('/api/customer').send(
    //         {username: 'test1234', password: testPassword, email: 'joes@email.com'}
    //     )
    //     expect(res.status).toBe(404)
    //     expect(res.body.msg).toEqual('Username: test1234 / email: joes@email.com and or password not found');
    // });
    
    // it('GET /customers Returns bad request if password or email is imputted incorrectly', async () => {
    //     const res = await request.get('/api/customer').send(
    //         {username: 'test123', password: 'test', email: 'joes@.com'}
    //     )
    //     expect(res.status).toBe(400);
    //     expect(res.body.msg).toEqual('bad request');
    // });
})


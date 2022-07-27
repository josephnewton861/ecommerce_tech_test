const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const {testPassword} = require('../db/connection');


describe('POST /customer', () => {
    it('POST /Adds a customer to the db', async () => {
        const res = await request.post('/api/customer').send(
            {username: 'test123', password: testPassword, address: '181 test street', email: 'joe@email.com', postcode: 'test2345'}
        )
        expect(res.status).toBe(200)
        expect(res.body.msg).toBe('Successful registration'); 
    });
})

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
            {username: 'test12345', password: testPassword, email: 'joes@email.com'}
        )
        expect(res.status).toBe(404)
        expect(res.body.msg).toEqual('Username: test12345 / email: joes@email.com and or password not found');
    });
    
    it('GET /customers Returns bad request if password or email is imputted incorrectly', async () => {
        const res = await request.get('/api/customer').send(
            {username: 'test123', password: 'test', email: 'joes@.com'}
        )
        expect(res.status).toBe(400);
        expect(res.body.msg).toEqual('bad request');
    });
})

describe('PATCH /customer/username', () => {
    it('PATCH /Update address and postcode of a specific user ', async () => {
        const res = await request.patch('/api/customer/test123').send({address: '182 test street', postcode: 'test5678'})
        expect(res.status).toBe(200)
    });
    it('PATCH /Update address and postcode of a specific user with a username that does not exist', async () => {
        const res = await request.patch('/api/customer/fjbfjd').send({address: '182 test street', postcode: 'test5678'})
        expect(res.status).toBe(404)
    });
})

describe('PATCH /customer', () => {
    it('PATCH /Update status of user', async () => {
        const res = await request.patch('/api/customer').send({username: 'test123', status: 1})
        expect(res.status).toBe(200)
    });
})

describe('DELETE /customer/username', () => {
    it('DELETE /Deletes customer from db', async () => {
        const res = await request.delete('/api/customer/test123')
        expect(res.status).toBe(200)
    });
})




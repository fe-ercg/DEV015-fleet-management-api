import request  from "supertest";
import app from "../src/app";
// import { describe } from "node:test";

describe("e2e USERS CRUD", ()=> {
    let createdUserId: string;

    it('should create a new user successfully', async () => {
    const res = await request(app)
        .post('/users')
        .send({
            name: 'Jack cats',
            email: 'jack.c@meows.com',
            password: 'jack123'
        });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Jack cats');
    expect(res.body.email).toBe('jack.c@meows.com');
    
    createdUserId = res.body.id;
    });

    it('should update the user information', async () => {
    const res = await request(app)
        .patch(`/users/${createdUserId}`)
        .send({
        name: 'Jackson'
        });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Jackson');
    });

    it('should retrieve the list of users including the newly created user', async () => {
    const res = await request(app).get('/users');
    
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    
    const user = res.body.find((u: any) => u.id === createdUserId);
    expect(user).toBeDefined();
    expect(user.name).toBe('Jackson');
    });

    it('should delete the created user', async () => {
    const res = await request(app)
        .delete(`/users/${createdUserId}`);
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.id).toBe(createdUserId);
    });

    it('should return 404 when trying to get the deleted user', async () => {
    const res = await request(app)
        .get(`/users/${createdUserId}`);
    
    expect(res.status).toBe(404);
    });
})
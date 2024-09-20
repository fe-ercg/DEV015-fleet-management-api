import request  from "supertest";
import app from "../src/app";
import jwt from "jsonwebtoken";
import prisma from "../src/client";

const JWT_KEY = 'admin';

interface User {
    id: number,
    name: string,
    email: string,
    password: string
}

describe("e2e USERS CRUD", ()=> {
    let token: string;

    beforeEach(()=> {
        token = jwt.sign({username: 'Admin'}, JWT_KEY, {expiresIn: '1h'});
    })


    it('should create a new user successfully', async () => {
    const data = {
        name: 'Jack Cat',
        email: 'jack.c@meows.com',
        password: 'jack123'
    }
    const register = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: 'Jack Cat',
            email: 'jack.c@meows.com',
            password: 'jack123'
        
        });
    expect(register.status).toBe(201);
    //obtener id
    const userId = register.body.id;
    
    const loginResponse = await request(app)
        .post('/auth/login')
        .set('Authorization', `Bearer ${token}`)
        .send({
        email: data.email,
        password: data.password
    })
    expect(loginResponse.status).toBe(200);
    
    const getNewUser = await request(app)
        .get('/users?limit=11')
        .set('Authorization', `Bearer ${token}`);
        
    const usersArray = getNewUser.body;
    const filterUser = usersArray.find((user: User) => user.email === 'jack.c@meows.com');

    expect(filterUser).toBeDefined;
    expect(filterUser?.name).toBe('Jack Cat');
    
    const patchUser = await request(app)
    .patch(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: 'User Uptdate',
        });
    
    expect(patchUser.status).toBe(200);

    const getPatchUsers = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${token}`);
        
    const findPatchUser = getPatchUsers.body.find((user: User) => user.name === 'User Uptdate');
    expect(findPatchUser).toBeDefined;

    const deleteUser = await request(app)
        .delete(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`);
    expect(deleteUser.status).toBe(200);

    const loginResponseAfeterDelete = await request(app)
        .post('/auth/login')
        .set('Authorization', `Bearer ${token}`)
        .send({
        email: data.email,
        password: data.password
    })
    expect(loginResponseAfeterDelete.status).toBe(404);
    });
})
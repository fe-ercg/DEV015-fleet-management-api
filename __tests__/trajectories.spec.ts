import request from "supertest";
import app from "../src/app";
import jwt from "jsonwebtoken";
import prisma from "../src/client";

const JWT_KEY = 'admin';

describe("GET /trajectories/latest", () => {
    let token: string;

    beforeEach(()=> {
        token = jwt.sign({username: 'Admin'}, JWT_KEY, {expiresIn: '1h'});
    })

    it('should return results that contain the last trajectorie for each taxi', async ()=> {
        const response = await request(app)
            .get('/trajectories/latest')
            .set('Authorization', `Bearer ${token}`)

        const lastTrajectories = await prisma.trajectories.groupBy({
            by: ['taxi_id'],
            _max: {
            date: true,
            },
        });

        expect(response.body.lenght).toEqual(lastTrajectories.length)
    })
})
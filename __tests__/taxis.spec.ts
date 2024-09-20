import request from "supertest";
import app from "../src/app";
import jwt from "jsonwebtoken";

const JWT_KEY = 'admin';

describe("GET /taxis", () => {
    let token: string;

    beforeEach(()=> {
        token = jwt.sign({username: 'Admin'}, JWT_KEY, {expiresIn: '1h'});
    })

    it('should return results that contain the "plate" parameter value', async () => {
        const plateValue = 'EF';

        const response = await request(app)
            .get("/taxis")
            .set('Authorization', `Bearer ${token}`)
            .query({plate: plateValue});

        expect(response.status).toEqual(200);
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body)).toBe(true);

        // console.log(response);
        response.body.forEach((item: any) => {
            expect(item.plate).toMatch(plateValue);
        })
    });
});



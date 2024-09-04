import request from "supertest";
import app from "../src/app";
import { getTaxis } from "../src/models/taxisModel";
import { describe } from "node:test";

// jest.mock("../src/models/taxisModel");

//integridad de datos

describe("GET /taxis", () => {
    it('should return results that contain the "plate" parameter value', async () => {
        const plateValue = 'EF';

        const response = await request(app)
            .get("/taxis")
            .query({plate: plateValue});

        expect(response.status).toEqual(200);
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body)).toBe(true);

        response.body.forEach((item: any) => {
            expect(item.plate).toMatch(plateValue);
        })
    });
});

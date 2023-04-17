import { Favorites } from "../src/models/Favorites";
import Request from "supertest";

const baseURL = "http://localhost:4000";

describe("Favorites", () => {
    it("should be defined", () => {
        expect(Favorites).toBeDefined();
    });
});

describe("GET all favorites", () => {
    it("should return 200 OK", async () => {
        const response = await Request(baseURL).get("/favorites");
        expect(response.status).toBe(200);
    });
});

describe("GET favorite by id", () => {
    it("should return 200 OK", async () => {
        const response = await Request(baseURL).get("/favorites/412da9b3-20b0-4e9a-9e68-55ad53f92a84");
        expect(response.status).toBe(200);
    });
});

describe("POST favorite", () => {
    it("should return 201 CREATED", async () => {
        const response = await Request(baseURL).post("/favorites").send({
            "uri": "https://www.google.com",
            "method": "GET",
            "user_id": "412da9b3-20b0-4e9a-9e68-55ad53f92a84"
        });
        expect(response.status).toBe(201);
    });
});

describe("PUT favorite", () => {
    it("should return 200 OK", async () => {
        const response = await Request(baseURL).put("/favorites/412da9b3-20b0-4e9a-9e68-55ad53f92a84").send({
            "uri": "https://www.google.com",
            "method": "GET",
            "user_id": "412da9b3-20b0-4e9a-9e68-55ad53f92a84"
        });
        expect(response.status).toBe(200);
    });
});

describe("DELETE favorite", () => {
    it("should return 200 OK", async () => {
        const response = await Request(baseURL).delete("/favorites/412da9b3-20b0-4e9a-9e68-55ad53f92a84");
        expect(response.status).toBe(200);
    });
});
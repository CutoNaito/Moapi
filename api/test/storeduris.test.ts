import { StoredURIs } from "../src/models/StoredURIs";
import Request from "supertest";

const baseURL = "http://localhost:4000";

describe("StoredURIs", () => {
    it("should be defined", () => {
        expect(StoredURIs).toBeDefined();
    });
});

describe("GET all stored URIs", () => {
    it("should return 200 OK", async () => {
        const response = await Request(baseURL).get("/stored_uris");
        expect(response.status).toBe(200);
    });
});

describe("GET stored URI by id", () => {
    it("should return 200 OK", async () => {
        const response = await Request(baseURL).get("/stored_uris/412da9b3-20b0-4e9a-9e68-55ad53f92a84");
        expect(response.status).toBe(200);
    });
});

describe("POST stored URI", () => {
    it("should return 201 CREATED", async () => {
        const response = await Request(baseURL).post("/stored_uris").send({
            "uri": "https://www.google.com",
            "method": "GET",
            "user_id": "412da9b3-20b0-4e9a-9e68-55ad53f92a84"
        });
        expect(response.status).toBe(201);
    });
});

describe("PUT stored URI", () => {
    it("should return 200 OK", async () => {
        const response = await Request(baseURL).put("/stored_uris/412da9b3-20b0-4e9a-9e68-55ad53f92a84").send({
            "uri": "https://www.google.com",
            "method": "GET",
            "user_id": "412da9b3-20b0-4e9a-9e68-55ad53f92a84"
        });
        expect(response.status).toBe(200);
    });
});

describe("DELETE stored URI", () => {
    it("should return 200 OK", async () => {
        const response = await Request(baseURL).delete("/stored_uris/412da9b3-20b0-4e9a-9e68-55ad53f92a84");
        expect(response.status).toBe(200);
    });
});
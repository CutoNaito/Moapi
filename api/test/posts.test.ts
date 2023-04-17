import { Posts } from "../src/models/help/Posts";
import Request from "supertest";

const baseURL = "http://localhost:4000";

describe("Posts", () => {
    it("should be defined", () => {
        expect(Posts).toBeDefined();
    });
});

describe("GET all posts", () => {
    it("should return 200 OK", async () => {
        const response = await Request(baseURL).get("/posts");
        expect(response.status).toBe(200);
    });
});

describe("GET post by id", () => {
    it("should return 200 OK", async () => {
        const response = await Request(baseURL).get("/posts/412da9b3-20b0-4e9a-9e68-55ad53f92a84");
        expect(response.status).toBe(200);
    });
});

describe("POST post", () => {
    it("should return 201 CREATED", async () => {
        const response = await Request(baseURL).post("/posts").send({
            "title": "Test",
            "content": "Test",
            "user_id": "412da9b3-20b0-4e9a-9e68-55ad53f92a84"
        });
        expect(response.status).toBe(201);
    });
});

describe("PUT post", () => {
    it("should return 200 OK", async () => {
        const response = await Request(baseURL).put("/posts/412da9b3-20b0-4e9a-9e68-55ad53f92a84").send({
            "title": "Test",
            "content": "Test",
            "user_id": "412da9b3-20b0-4e9a-9e68-55ad53f92a84"
        });
        expect(response.status).toBe(200);
    });
});

describe("DELETE post", () => {
    it("should return 200 OK", async () => {
        const response = await Request(baseURL).delete("/posts/412da9b3-20b0-4e9a-9e68-55ad53f92a84");
        expect(response.status).toBe(200);
    });
});
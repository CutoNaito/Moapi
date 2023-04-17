import { Comments } from "../src/models/help/Comments";
import Request from "supertest";

const baseURL = "http://localhost:4000";

describe("Comments", () => {
    it("should be defined", () => {
        expect(Comments).toBeDefined();
    });
});

describe("GET all comments", () => {
    it("should return 200 OK", async () => {
        const response = await Request(baseURL).get("/comments");
        expect(response.status).toBe(200);
    });
});

describe("GET comment by id", () => {
    it("should return 200 OK", async () => {
        const response = await Request(baseURL).get("/comments/412da9b3-20b0-4e9a-9e68-55ad53f92a84");
        expect(response.status).toBe(200);
    });
});

describe("POST comment", () => {
    it("should return 201 CREATED", async () => {
        const response = await Request(baseURL).post("/comments").send({
            "content": "Test",
            "user_id": "412da9b3-20b0-4e9a-9e68-55ad53f92a84",
            "post_id": "412da9b3-20b0-4e9a-9e68-55ad53f92a84"
        });
        expect(response.status).toBe(201);
    });
});

describe("PUT comment", () => {
    it("should return 200 OK", async () => {
        const response = await Request(baseURL).put("/comments/412da9b3-20b0-4e9a-9e68-55ad53f92a84").send({
            "content": "Test",
            "user_id": "412da9b3-20b0-4e9a-9e68-55ad53f92a84",
            "post_id": "412da9b3-20b0-4e9a-9e68-55ad53f92a84"
        });
        expect(response.status).toBe(200);
    });
});

describe("DELETE comment", () => {
    it("should return 200 OK", async () => {
        const response = await Request(baseURL).delete("/comments/412da9b3-20b0-4e9a-9e68-55ad53f92a84");
        expect(response.status).toBe(200);
    });
});
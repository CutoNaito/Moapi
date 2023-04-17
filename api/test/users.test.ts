import { Users } from '../src/models/Users';
import Request from 'supertest';

const baseURL = 'http://localhost:4000';

describe('Users', () => {
    it('should be defined', () => {
        expect(Users).toBeDefined();
    });
});

describe('GET all users', () => {
    it('should return 200 OK', async () => {
        const response = await Request(baseURL).get('/users');
        expect(response.status).toBe(200);
    }
)});

describe('GET user by id', () => {
    it('should return 200 OK', async () => {
        const response = await Request(baseURL).get('/users/412da9b3-20b0-4e9a-9e68-55ad53f92a84');
        expect(response.status).toBe(200);
    }
)});

describe('POST user', () => {
    it('should return 201 CREATED', async () => {
        const response = await Request(baseURL).post('/users').send({
            "name": "Test",
            "email": "test@test.com",
            "password": "test"
        });
        expect(response.status).toBe(201);
    }
)});

describe('PUT user', () => {
    it('should return 200 OK', async () => {
        const response = await Request(baseURL).put('/users/412da9b3-20b0-4e9a-9e68-55ad53f92a84').send({
            "name": "Test",
            "email": "test@test.com",
            "password": "test"
        });
        expect(response.status).toBe(200);
    }
)});

describe('DELETE user', () => {
    it('should return 200 OK', async () => {
        const response = await Request(baseURL).delete('/users/412da9b3-20b0-4e9a-9e68-55ad53f92a84');
        expect(response.status).toBe(200);
    }
)});
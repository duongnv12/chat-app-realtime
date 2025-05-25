const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

const testUser = { email: "test@example.com", password: "password123" };

beforeAll(async () => {
    const uri = process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/auth_test_db';
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
});

describe("Auth Service", () => {
    it("should return status 200 from health check", async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toEqual(200);
    });

    it("should register a user", async () => {
        const res = await request(app).post('/api/auth/register').send(testUser);
        expect(res.statusCode).toEqual(201);
    });

    it("should login a valid user and return JWT token", async () => {
        const res = await request(app).post('/api/auth/login').send(testUser);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });
}, 10000);

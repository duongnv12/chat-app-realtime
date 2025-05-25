const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

const testMessage = {
    sender: "user1",
    receiver: "user2",
    message: "Hello from Chat Service!"
};

beforeAll(async () => {
    const uri = process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/chat_test_db';
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
});

describe("Chat Service", () => {
    it("should return status 200 from health check", async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toEqual(200);
    });

    it("should send a message successfully", async () => {
        const res = await request(app).post('/api/chat/send').send(testMessage);
        expect(res.statusCode).toEqual(201);
    });

    it("should retrieve chat history", async () => {
        const res = await request(app).get('/api/chat/history/user1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
}, 10000);

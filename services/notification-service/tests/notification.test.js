const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

beforeAll(async () => {
    const uri = process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/notification_test_db';
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
});

describe("Notification Service", () => {
    it("should return status 200 from health check", async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toEqual(200);
    });

    it("should trigger notification on new message event", async () => {
        const io = require('socket.io-client');
        const clientSocket = io('http://localhost:3007');

        clientSocket.emit('newMessage', { sender: "user1" });

        const receivedMsg = await new Promise((resolve) => {
            clientSocket.on('notification', resolve);
        });

        expect(receivedMsg).toHaveProperty('message');
    });
}, 10000); // Set timeout to 10 seconds for the socket event

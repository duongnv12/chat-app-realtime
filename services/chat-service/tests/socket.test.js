const io = require('socket.io-client');

describe("WebSocket Messaging", () => {
    let clientSocket;

    beforeAll((done) => {
        clientSocket = io('http://localhost:3002', {
            transports: ['websocket'],
            forceNew: true,
        });

        clientSocket.on('connect', () => {
            console.log("✅ WebSocket connected!");
            setTimeout(done, 3000); // Đợi 3 giây trước khi bắt đầu test
        });

        clientSocket.on('connect_error', (error) => {
            console.error("🔥 WebSocket connect error:", error);
            done(error);
        });
    });


    afterAll(() => {
        if (clientSocket.connected) {
            clientSocket.close();
            console.log("🛑 WebSocket closed.");
        }
    });

    it("should send and receive message via WebSocket", (done) => {
        const messageData = { sender: "user1", receiver: "user2", message: "Hello WebSocket!" };

        clientSocket.emit('sendMessage', messageData);

        clientSocket.on('receiveMessage', (receivedMsg) => {
            console.log("📩 Received message:", receivedMsg);
            expect(receivedMsg).toMatchObject(messageData);
            done(); // Kết thúc test khi nhận tin nhắn
        });
    });
}, 10000); // Timeout for the test

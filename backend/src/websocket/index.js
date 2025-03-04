import { WebSocketServer } from "ws";

function connectToWebSocket(port) {
    console.log("Starting WebSocket server on port:", port);
    const wss = new WebSocketServer({ port });

    wss.on("connection", (ws) => {
        console.log("New client connected");

        ws.on("message", (message) => {
            try {
                const parsedMessage = JSON.parse(message);
                const { event, data } = parsedMessage; // This expects the message format: { event, data }

                switch (event) {
                    case "setup":
                        ws.userData = data.user; // Store user data correctly
                        ws.send(JSON.stringify({ event: "connected" }));
                        break;

                    case "join chat":
                        ws.room = data.chatId; // Expecting `chatId` inside `data`
                        console.log("User joined chat:", data.chatId);
                        break;

                    case "new message":
                        const chat = data.chat;
                        if (!chat?.users) return;
                        console.log(
                            "=== data.chat index.js [29] ===",
                            data.chat
                        );
                        chat.users.forEach((user) => {
                            if (user._id === data.sender._id) return;

                            wss.clients.forEach((client) => {
                                if (
                                    client !== ws &&
                                    client.readyState === WebSocket.OPEN &&
                                    client.userData &&
                                    client.userData.id === user._id
                                ) {
                                    client.send(
                                        JSON.stringify({
                                            event: "message received",
                                            data, // Wrapping the data back into `data` key
                                        })
                                    );
                                    console.log('=== message recived index.js [49] ===');
                                }
                            });
                        });
                        break;

                    case "typing":
                        wss.clients.forEach((client) => {
                            const chatId = data?.chatId; // Expecting `chatId` inside `data`
                            if (!chatId) {
                                console.log(
                                    "Chat ID is undefined in 'typing' event"
                                );
                                return;
                            }

                            if (
                                client !== ws &&
                                client.readyState === WebSocket.OPEN &&
                                client.room === chatId
                            ) {
                                client.send(
                                    JSON.stringify({
                                        event: "typing",
                                        data: { typerName: data.typerName },
                                    })
                                );
                            }
                        });
                        break;

                    case "stop typing":
                        wss.clients.forEach((client) => {
                            const chatId = data?.chatId; // Expecting `chatId` inside `data`
                            if (!chatId) {
                                console.log(
                                    "Chat ID is undefined in 'stop typing' event"
                                );
                                return;
                            }

                            if (
                                client !== ws &&
                                client.readyState === WebSocket.OPEN &&
                                client.room === chatId
                            ) {
                                client.send(
                                    JSON.stringify({ event: "stop typing" })
                                );
                            }
                        });
                        break;

                    default:
                        console.log("Unknown event:", event);
                }
            } catch (err) {
                console.error("Error parsing WebSocket message:", err);
            }
        });

        ws.on("close", () => {
            console.log("Client disconnected");
        });

        ws.on("error", (error) => {
            console.error("WebSocket error:", error);
        });
    });

    console.log("WebSocket server is running");
}

export default connectToWebSocket;

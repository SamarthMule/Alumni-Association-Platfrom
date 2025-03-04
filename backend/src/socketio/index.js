import { Server } from "socket.io";

export const connectToSocketIO = (server) => {
    const io = new Server(server, {
        cors: {
            origin: ["http://localhost:5173", "http://localhost:8000"],
            methods: ["GET", "POST", "PUT", "DELETE"],
        },
    });

    io.on("connection", (socket) => {
        console.log("Connnected to SocketIO");

        socket.on("setup", (userData) => {
            socket.join(userData._id);
            socket.emit("connected");
            console.log(`${userData.name} connected`);
        });
        socket.on("join chat", (room) => {
            socket.join(room);
            console.log(`Room created, id: ${room}`);
        });
        socket.on("new message", (newMessage) => {
            const chat = newMessage.chat;
            console.log("A new message has been sent");
            console.table(chat);
            if (!chat.users || chat.users.length === 0) { console.warn("Chat has no users."); return; }
            chat.users.forEach((user) => {
                console.table(user);
                if (user._id === newMessage.sender._id) return;
                socket.in(user._id).emit("recieved", newMessage, (ack) => {
                    if (ack) {
                        console.log("Message emitted successfully");
                    } else {
                        console.log("Message emission failed");
                    }
                });
            });
        });
        socket.on("typing", (room) => {
            socket
                .in(room.selectedChat ? room.selectedChat : room)
                .emit("typing", room.selectedChat && room.typerName);
        });
        socket.on("stop typing", (room) => {
            socket.in(room).emit("stop typing");
        });
    });
};

export default connectToSocketIO;

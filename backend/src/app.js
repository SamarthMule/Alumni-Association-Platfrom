import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes.js"
import mentorshipRouter from "./routes/mentorship.route.js"
import adminRouter from "./routes/admin.routes.js"
import jobRouter from "./routes/job.routes.js"
import postRouter from "./routes/post.routes.js"
import eventRouter from "./routes/event.routes.js"
import chatRouter from "./routes/chat.routes.js"
import messageRouter from "./routes/message.routes.js"

const app = express()

app.use(cors());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use(cookieParser());

// DEPLOYMENT CODE
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname2, '/frontend/dist')));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname2, 'frontend', 'dist', 'index.html')));
}
else {
    app.get('/', (req, res) => {
        res.send('Server is running in dev mode');
    });
    console.log('=== Dev Mode server.js ===');
}

app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/mentorships", mentorshipRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/chats", chatRouter);
app.use("/api/v1/messages", messageRouter);


app.get('/', (req, res) => {
    res.send("Welcome to backend of alumni association platform.....");
})

export { app }


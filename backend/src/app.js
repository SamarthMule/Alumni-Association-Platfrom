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

app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/mentorships", mentorshipRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/chats", chatRouter);
app.use("/api/v1/messages", messageRouter);


app.get('/', (req, res) => {
    res.send("Welcome to backend of alumni association platform.....");
})

export { app }


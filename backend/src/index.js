import dotenv from "dotenv"
import { app } from "./app.js"
import connectToDb from "./db/index.js"

import connectToSockedIO from "./socketio/index.js"
import connectToWebSocket from "./websocket/index.js"

dotenv.config({
    path: "./env"
})

connectToDb()
    .then(() => {
        app.on("error", () => {
            console.log("Error in communication between server and Db");
        })

        const server = app.listen(process.env.PORT || 8000, () => {
            console.log("Server running at port", process.env.PORT);
        })

        // Socket IO Connection
        connectToSockedIO(server);

        // Web Socket Connection
        // connectToWebSocket(5000);
    })
    .catch((error) => {
        console.log("Connection failed at index.js", error);
    })



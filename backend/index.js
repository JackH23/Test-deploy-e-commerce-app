const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const router = require("./routes");
const cookieParser = require("cookie-parser");
require('dotenv').config()

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

// Increase body parsing limits to avoid PayloadTooLargeError when handling
// larger JSON bodies (e.g. product images encoded as base64 strings).
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cookieParser());

app.use("/api", router)

const PORT = 8080 || process.env.PORT

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("connect to DB")
        console.log("Server is running on port " + PORT); // Log the server start and port number
    });
})
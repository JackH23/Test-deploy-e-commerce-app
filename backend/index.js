const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const router = require("./routes");
const cookieParser = require("cookie-parser");
require('dotenv').config();

const app = express();

const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:3000"].filter(Boolean);

app.use(cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : undefined,
    credentials: true
}));

app.use(express.json());

app.use(cookieParser());

app.use("/api", router);

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("connect to DB");
        console.log("Server is running on port " + PORT); // Log the server start and port number
    });
});
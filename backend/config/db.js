const mongoose = require("mongoose");

async function connectDB() {
    const { MONGODB_URL, MONGODB_DB_NAME } = process.env;

    if (!MONGODB_URL) {
        throw new Error("Missing MONGODB_URL environment variable");
    }

    const connectionOptions = {};
    let connectionString = MONGODB_URL;

    // When no database name is provided in the connection string MongoDB
    // defaults to the `test` database. In production the database user often
    // only has permissions on a specific database, which results in the error
    // `user is not allowed to do action [insert] on [test.users]`. Allow the
    // database name to be provided separately so deployments can target the
    // correct database without changing the URI format.
    if (MONGODB_DB_NAME) {
        connectionOptions.dbName = MONGODB_DB_NAME;

        try {
            const parsedUrl = new URL(MONGODB_URL);
            const hasExplicitDbName = parsedUrl.pathname && parsedUrl.pathname !== "/";

            if (!hasExplicitDbName || parsedUrl.pathname === "/test") {
                parsedUrl.pathname = `/${MONGODB_DB_NAME}`;
                connectionString = parsedUrl.toString();
            }
        } catch (parseError) {
            // Ignore parsing issues and fall back to the dbName connection option.
        }
    }

    try {
        await mongoose.connect(connectionString, connectionOptions);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message);
        throw error;
    }
}

module.exports = connectDB;
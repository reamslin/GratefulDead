const { Client } = require("pg");

let DB_URI;

function getDatabaseUri() {
    return (process.env.NODE_ENV === "test")
        ? "postgresql:///gd_test"
        : process.env.DATABASE_URL || "postgresql:///gd";
}

if (process.env.NODE_ENV === "production") {
    db = new Client({
        connectionString: getDatabaseUri(),
        ssl: {
            rejectUnauthorized: false
        }
    });
} else {
    db = new Client({
        connectionString: getDatabaseUri()
    });
}

db.connect();

module.exports = db;
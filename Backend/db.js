const { Client } = require("pg");

let DB_URI = process.env.HEROKU_POSTGRESQL_CYAN_URL;

function getDatabaseUri() {
  return process.env.NODE_ENV === "test"
    ? "postgresql:///gd_test"
    : DB_URI || "postgresql:///gd";
}

if (process.env.NODE_ENV === "production") {
  db = new Client({
    connectionString: getDatabaseUri(),
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  db = new Client({
    connectionString: getDatabaseUri(),
  });
}

db.connect();

module.exports = db;

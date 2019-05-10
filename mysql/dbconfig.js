require('dotenv').load();

let config = {
  host    : process.env.HOST,
  user    : process.env.USER,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  database: process.env.DB_NAME,
  connectTimeout: 60000
};

module.exports = config;

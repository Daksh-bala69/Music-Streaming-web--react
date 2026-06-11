import pg from "pg";
import dotenv from "dotenv";

// THE CONNECTION TO THE DATABASE

dotenv.config();

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
});

export default pool;
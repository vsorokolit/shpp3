import mysql from "mysql2/promise";
import { Pool } from "mysql2/promise";
require("dotenv").config();

const pool: Pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default pool;

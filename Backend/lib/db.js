import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
});


(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL database successfully!');
    connection.release(); 
  } catch (error) {
    console.error('❌ Failed to connect to MySQL database:', error);
  }
})();

export default pool;

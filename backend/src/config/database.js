import pg from "pg"

const { Pool } = pg



const pool = new Pool({
    connectionString: process.env.DATABASE_URI,
    host: 'aws-1-ap-south-1.pooler.supabase.com',
    user: 'postgres.ziugabjrnfpbomaesevj',
    password: '5dNOqrL6mZ4cfmge',
    database: 'postgres',
    port: 6543,
    ssl: {
        rejectUnauthorized: false
    },
})


const testDB = async () => {
    try {
        const res = await pool.query('SELECT NOW()')
        console.log("databse connected: ", res.rows)
    }
    catch (err) {
        console.log(err)
        throw err
    }
}

// testDB()
export { pool, testDB }
import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'tcg',
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 2000, // How long to wait when connecting a new client
})

// Error handling for the pool
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle PostgreSQL client', err)
  process.exit(-1)
})

// Helper function to test database connection
export const testConnection = async () => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT NOW()')
    console.log('✓ PostgreSQL connected successfully at:', result.rows[0].now)
    client.release()
    return true
  } catch (err) {
    console.error('✗ PostgreSQL connection error:', err)
    throw err
  }
}

// Helper function to execute a query
export const query = async (text: string, params?: any[]) => {
  const start = Date.now()
  try {
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log('Executed query', { text, duration, rows: res.rowCount })
    return res
  } catch (error) {
    console.error('Query error:', error)
    throw error
  }
}

// Helper function to get a client from the pool for transactions
export const getClient = async () => {
  const client = await pool.connect()
  
  // Set a timeout of 5 seconds, after which we will log this client's last query
  const timeout = setTimeout(() => {
    console.error('A client has been checked out for more than 5 seconds!')
  }, 5000)
  
  // Override release to clear the timeout
  const originalRelease = client.release.bind(client)
  client.release = () => {
    clearTimeout(timeout)
    return originalRelease()
  }
  
  return client
}

export default pool

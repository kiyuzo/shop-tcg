import pool from './pool'

/**
 * Database initialization script
 * This file contains the SQL schema for the TCG E-commerce database
 */

export const createTablesSQL = `
-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR NOT NULL,
    role VARCHAR(10) NOT NULL DEFAULT 'Buyer', -- Buyer or Admin
    created_at TIMESTAMP DEFAULT NOW()
);

-- PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
    product_id SERIAL PRIMARY KEY,
    api_card_id VARCHAR UNIQUE, -- ID from Scryfall / PokemonTCG
    name VARCHAR NOT NULL,
    image_url VARCHAR,
    set_name VARCHAR,
    rarity VARCHAR,
    game VARCHAR  -- Vanguard, Pokemon, MTG, etc.
);

-- INVENTORY TABLE
CREATE TABLE IF NOT EXISTS inventory (
    inventory_id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    price INT NOT NULL, -- Price in IDR
    stock_quantity INT NOT NULL DEFAULT 0,
    condition VARCHAR DEFAULT 'Near Mint',
    
    CONSTRAINT fk_inventory_product
        FOREIGN KEY (product_id)
        REFERENCES products (product_id)
        ON DELETE CASCADE
);

-- CARTS TABLE
CREATE TABLE IF NOT EXISTS carts (
    cart_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,

    CONSTRAINT fk_cart_user
        FOREIGN KEY (user_id)
        REFERENCES users (user_id)
        ON DELETE CASCADE
);

-- CART ITEMS TABLE
CREATE TABLE IF NOT EXISTS cart_items (
    cart_item_id SERIAL PRIMARY KEY,
    cart_id INT NOT NULL,
    inventory_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,

    CONSTRAINT fk_cartitems_cart
        FOREIGN KEY (cart_id)
        REFERENCES carts (cart_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_cartitems_inventory
        FOREIGN KEY (inventory_id)
        REFERENCES inventory (inventory_id)
        ON DELETE CASCADE
);

-- Unique constraint: a user cannot have duplicate inventory items in the same cart
CREATE UNIQUE INDEX IF NOT EXISTS cart_items_cart_inventory_unique
ON cart_items (cart_id, inventory_id);

-- ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
    order_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    total_price INT NOT NULL,
    status VARCHAR NOT NULL DEFAULT 'Pending', -- Pending, Shipped, Cancelled
    shipping_address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),

    CONSTRAINT fk_orders_user
        FOREIGN KEY (user_id)
        REFERENCES users (user_id)
        ON DELETE SET NULL
);

-- ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    inventory_id INT, -- can be NULL if deleted later

    product_name VARCHAR NOT NULL,
    quantity INT NOT NULL,
    price_at_purchase INT NOT NULL,

    CONSTRAINT fk_orderitems_order
        FOREIGN KEY (order_id)
        REFERENCES orders (order_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_orderitems_inventory
        FOREIGN KEY (inventory_id)
        REFERENCES inventory (inventory_id)
        ON DELETE SET NULL
);
`

/**
 * Initialize database tables
 * Creates all tables if they don't exist
 */
export const initializeDatabase = async () => {
  const client = await pool.connect()
  
  try {
    console.log('🔄 Initializing database tables...')
    await client.query(createTablesSQL)
    console.log('✓ Database tables created successfully')
    return true
  } catch (error) {
    console.error('✗ Error initializing database:', error)
    throw error
  } finally {
    client.release()
  }
}

/**
 * Drop all tables (use with caution!)
 */
export const dropAllTables = async () => {
  const client = await pool.connect()
  
  try {
    console.log('🔄 Dropping all tables...')
    await client.query(`
      DROP TABLE IF EXISTS order_items CASCADE;
      DROP TABLE IF EXISTS orders CASCADE;
      DROP TABLE IF EXISTS cart_items CASCADE;
      DROP TABLE IF EXISTS carts CASCADE;
      DROP TABLE IF EXISTS inventory CASCADE;
      DROP TABLE IF EXISTS products CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
    `)
    console.log('✓ All tables dropped successfully')
    return true
  } catch (error) {
    console.error('✗ Error dropping tables:', error)
    throw error
  } finally {
    client.release()
  }
}

/**
 * Check if tables exist
 */
export const checkTablesExist = async () => {
  const client = await pool.connect()
  
  try {
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `)
    
    console.log('📋 Existing tables:', result.rows.map(r => r.table_name).join(', '))
    return result.rows
  } catch (error) {
    console.error('✗ Error checking tables:', error)
    throw error
  } finally {
    client.release()
  }
}

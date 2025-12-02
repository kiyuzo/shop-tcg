/**
 * Database Query Helpers
 * Reusable query functions for common database operations
 */

import pool, { query, getClient } from './pool'
import { QueryResult } from 'pg'
import bcrypt from 'bcryptjs'

// ==================== USERS & AUTH ====================

export const findUserByEmail = async (email: string) => {
  const result = await query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  )
  return result.rows[0]
}

export const findUserByEmailWithPassword = async (email: string) => {
  const result = await query(
    'SELECT user_id, username, email, password_hash, role, created_at FROM users WHERE email = $1',
    [email]
  )
  return result.rows[0]
}

export const findUserById = async (userId: number) => {
  const result = await query(
    'SELECT user_id, username, email, role, created_at FROM users WHERE user_id = $1',
    [userId]
  )
  return result.rows[0]
}

export const findUserByUsername = async (username: string) => {
  const result = await query(
    'SELECT user_id, username, email, role, created_at FROM users WHERE username = $1',
    [username]
  )
  return result.rows[0]
}

export const createUser = async (username: string, email: string, password: string, role: string = 'Buyer') => {
  // Hash password
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(password, salt)
  
  const result = await query(
    'INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING user_id, username, email, role, created_at',
    [username, email, passwordHash, role]
  )
  return result.rows[0]
}

export const comparePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword)
}

// ==================== PRODUCTS ====================

export const getAllProducts = async (limit: number = 50, offset: number = 0) => {
  const result = await query(
    'SELECT * FROM products LIMIT $1 OFFSET $2',
    [limit, offset]
  )
  return result.rows
}

export const findProductById = async (productId: number) => {
  const result = await query(
    'SELECT * FROM products WHERE product_id = $1',
    [productId]
  )
  return result.rows[0]
}

export const createProduct = async (
  name: string,
  imageUrl?: string,
  setName?: string,
  rarity?: string,
  game?: string,
  apiCardId?: string
) => {
  const result = await query(
    `INSERT INTO products (name, image_url, set_name, rarity, game, api_card_id) 
     VALUES ($1, $2, $3, $4, $5, $6) 
     RETURNING *`,
    [name, imageUrl, setName, rarity, game, apiCardId]
  )
  return result.rows[0]
}

// ==================== INVENTORY ====================

export const getInventoryByProductId = async (productId: number) => {
  const result = await query(
    `SELECT i.*, p.name, p.image_url, p.set_name, p.rarity, p.game 
     FROM inventory i 
     JOIN products p ON i.product_id = p.product_id 
     WHERE i.product_id = $1`,
    [productId]
  )
  return result.rows
}

export const findInventoryById = async (inventoryId: number) => {
  const result = await query(
    `SELECT i.*, p.name, p.image_url, p.set_name, p.rarity, p.game 
     FROM inventory i 
     JOIN products p ON i.product_id = p.product_id 
     WHERE i.inventory_id = $1`,
    [inventoryId]
  )
  return result.rows[0]
}

export const createInventoryItem = async (
  productId: number,
  price: number,
  stockQuantity: number,
  condition: string = 'Near Mint'
) => {
  const result = await query(
    'INSERT INTO inventory (product_id, price, stock_quantity, condition) VALUES ($1, $2, $3, $4) RETURNING *',
    [productId, price, stockQuantity, condition]
  )
  return result.rows[0]
}

export const updateInventoryStock = async (inventoryId: number, newStock: number) => {
  const result = await query(
    'UPDATE inventory SET stock_quantity = $1 WHERE inventory_id = $2 RETURNING *',
    [newStock, inventoryId]
  )
  return result.rows[0]
}

// ==================== CART ====================

export const findOrCreateCart = async (userId: number) => {
  const client = await getClient()
  
  try {
    // Try to find existing cart
    let result = await client.query(
      'SELECT * FROM carts WHERE user_id = $1',
      [userId]
    )
    
    if (result.rows.length > 0) {
      return result.rows[0]
    }
    
    // Create new cart if not exists
    result = await client.query(
      'INSERT INTO carts (user_id) VALUES ($1) RETURNING *',
      [userId]
    )
    
    return result.rows[0]
  } finally {
    client.release()
  }
}

export const getCartItems = async (cartId: number) => {
  const result = await query(
    `SELECT ci.*, i.price, i.stock_quantity, i.condition, 
            p.name, p.image_url, p.set_name, p.rarity, p.game
     FROM cart_items ci
     JOIN inventory i ON ci.inventory_id = i.inventory_id
     JOIN products p ON i.product_id = p.product_id
     WHERE ci.cart_id = $1`,
    [cartId]
  )
  return result.rows
}

export const addToCart = async (cartId: number, inventoryId: number, quantity: number = 1) => {
  const result = await query(
    `INSERT INTO cart_items (cart_id, inventory_id, quantity) 
     VALUES ($1, $2, $3) 
     ON CONFLICT (cart_id, inventory_id) 
     DO UPDATE SET quantity = cart_items.quantity + $3
     RETURNING *`,
    [cartId, inventoryId, quantity]
  )
  return result.rows[0]
}

export const removeFromCart = async (cartItemId: number) => {
  await query('DELETE FROM cart_items WHERE cart_item_id = $1', [cartItemId])
}

export const clearCart = async (cartId: number) => {
  await query('DELETE FROM cart_items WHERE cart_id = $1', [cartId])
}

// ==================== ORDERS ====================

export const createOrder = async (
  userId: number,
  totalPrice: number,
  shippingAddress: string,
  status: string = 'Pending'
) => {
  const result = await query(
    'INSERT INTO orders (user_id, total_price, shipping_address, status) VALUES ($1, $2, $3, $4) RETURNING *',
    [userId, totalPrice, shippingAddress, status]
  )
  return result.rows[0]
}

export const createOrderItem = async (
  orderId: number,
  inventoryId: number,
  productName: string,
  quantity: number,
  priceAtPurchase: number
) => {
  const result = await query(
    `INSERT INTO order_items (order_id, inventory_id, product_name, quantity, price_at_purchase) 
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [orderId, inventoryId, productName, quantity, priceAtPurchase]
  )
  return result.rows[0]
}

export const getUserOrders = async (userId: number) => {
  const result = await query(
    'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  )
  return result.rows
}

export const getOrderById = async (orderId: number) => {
  const result = await query(
    'SELECT * FROM orders WHERE order_id = $1',
    [orderId]
  )
  return result.rows[0]
}

export const getOrderItems = async (orderId: number) => {
  const result = await query(
    'SELECT * FROM order_items WHERE order_id = $1',
    [orderId]
  )
  return result.rows
}

export const updateOrderStatus = async (orderId: number, status: string) => {
  const result = await query(
    'UPDATE orders SET status = $1 WHERE order_id = $2 RETURNING *',
    [status, orderId]
  )
  return result.rows[0]
}

export default {
  // Users & Auth
  findUserByEmail,
  findUserByEmailWithPassword,
  findUserById,
  findUserByUsername,
  createUser,
  comparePassword,
  
  // Products
  getAllProducts,
  findProductById,
  createProduct,
  
  // Inventory
  getInventoryByProductId,
  findInventoryById,
  createInventoryItem,
  updateInventoryStock,
  
  // Cart
  findOrCreateCart,
  getCartItems,
  addToCart,
  removeFromCart,
  clearCart,
  
  // Orders
  createOrder,
  createOrderItem,
  getUserOrders,
  getOrderById,
  getOrderItems,
  updateOrderStatus,
}

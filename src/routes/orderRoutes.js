// routes/orderRoutes.js
const express = require("express");
const OrderController = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @typedef {object} OrderRequest
 * @property {array} items.required - Array of items with menuId, name, quantity, price, and totalPrice
 * @property {number} totalAmount.required - Total amount of the order
 *
 * @typedef {object} OrderItem
 * @property {string} menuId.required - ID of the ordered menu item
 * @property {string} name.required - Name of the ordered menu item
 * @property {number} quantity.required - Quantity of the item ordered
 * @property {number} price.required - Price per item
 * @property {number} totalPrice.required - Total price for the item (calculated from quantity and menu price)
 */

/**
 * POST /api/orders
 * @summary Create a new order
 * @tags Orders
 * @param {OrderRequest} request.body.required - Order info
 * @return {object} 201 - Order created successfully
 * @return {object} 500 - Server error
 */
router.post("/", authMiddleware, OrderController.createOrder);

/**
 * GET /api/orders
 * @summary Get user orders
 * @tags Orders
 * @return {object} 200 - Orders fetched successfully
 * @return {object} 500 - Server error
 */
router.get("/", authMiddleware, OrderController.getOrders);

module.exports = router;

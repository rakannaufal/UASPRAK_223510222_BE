// controllers/orderController.js
const Order = require("../models/order");

const generateOrderNumber = () => {
  return `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

exports.createOrder = async (req, res) => {
  const userId = req.user.id;

  try {
    const { items, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Items cannot be empty" });
    }
    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ message: "Invalid total amount" });
    }

    // Buat nomor order unik
    const orderNumber = generateOrderNumber();

    const newOrder = new Order({
      orderNumber,
      userId,
      items,
      totalAmount,
    });

    const savedOrder = await newOrder.save();
    console.log("Order created successfully:", savedOrder);
    res
      .status(201)
      .json({ message: "Order created successfully", order: savedOrder });
  } catch (error) {
    console.error("Error creating order:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getOrders = async (req, res) => {
  const userId = req.user.id; // Ensure this ID is passed from the auth middleware

  try {
    const orders = await Order.find({ userId }); // Filter orders by userId
    res.status(200).json({ message: "Orders fetched successfully", orders });
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

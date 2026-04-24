import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
const getAdminStats = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  const users = await User.countDocuments({});
  const products = await Product.countDocuments({});

  const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

  const lowStockProducts = await Product.find({ countInStock: { $lt: 5 } }).select('name countInStock');

  res.json({
    totalOrders: orders.length,
    totalUsers: users,
    totalProducts: products,
    totalRevenue: totalRevenue.toFixed(2),
    lowStock: lowStockProducts,
  });
});

export { getAdminStats };

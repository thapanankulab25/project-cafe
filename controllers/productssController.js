const Product = require('../models/Product');
const productController = async (req, res) => {
  try {
    // ดึงข้อมูล products จากฐานข้อมูล
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    // จัดการ error ในกรณีที่มีปัญหาในการดึงข้อมูล
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
  }
};

module.exports = productController;

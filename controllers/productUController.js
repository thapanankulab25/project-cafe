const User = require('../models/User');
const Product = require('../models/Product'); // Assuming you have a Product model

module.exports = async (req, res) => {
    try {
        let UserData = await User.findById(req.session.userId);
        let products = await Product.find();
        res.render('productU', {
            UserData,
            products
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
};


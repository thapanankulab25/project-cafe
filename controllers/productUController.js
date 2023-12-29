const User = require('../models/User');
const Product = require('../models/Product'); // Assuming you have a Product model

module.exports = async (req, res) => {
    try {
        // Get user data
        let UserData = await User.findById(req.session.userId);

        // Get all products
        let products = await Product.find();

        // Render the view with user data and products
        res.render('productU', {
            UserData,
            products
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
};

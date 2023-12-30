const User = require('../models/User');
const Product = require('../models/Product');

module.exports = async (req, res) => {
    try {
        let UserData = await User.findById(req.session.userId);
        const productId = req.query.id;
        let product = await Product.findById(productId);
        let productTypes = await Product.distinct('type');

        res.render('editproductU', {
            UserData,
            product,
            productTypes,

        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
};

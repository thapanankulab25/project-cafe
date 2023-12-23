const User = require('../models/User')
module.exports = async(req,res) =>{
    let UserData = await User.findById(req.session.userId)
    res.render('editproductU', {
    UserData,
    })
}


// const Product = require('../models/Product');
// const User = require('../models/User');

// module.exports = async (req, res) => {
//     try {
//         // Fetch user data
//         const userData = await User.findById(req.session.userId);
//         res.render('editproductU', {
//             userData,
//         });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).send('Internal Server Error');
//     }
// };

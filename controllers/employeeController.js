const User = require('../models/User')
module.exports = async(req,res) =>{

    let UserData = await User.findById(req.session.userId)
    res.render('employee', {
    UserData,
    })
}
// const User = require('../models/User');

// module.exports = async (req, res) => {
//     let UserData = await User.findById(req.session.userId);
//     let email = '';
//     let password = '';
//     let username = '';
//     let phone = '';
//     let firstname = '';
//     let lastname = '';

//     let data = req.flash('data')[0];

//     if (typeof data !== 'undefined') {
//         username = data.username;
//         email = data.email;
//         password = data.password;
//         phone = data.phone;
//         firstname = data.firstname;
//         lastname = data.lastname;
//     }

//     res.render('employee', {
//         UserData,
//         errors: req.flash('validationErrors'),
//         username,
//         email,
//         password,
//         phone,
//         firstname,
//         lastname
//     });
// };
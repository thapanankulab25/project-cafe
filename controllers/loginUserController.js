const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username });

        if (user) {
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                req.session.userId = user._id;

                // Check the user's role and redirect accordingly
                if (user.role === 'เจ้าของร้าน') {
                    res.redirect('/home');
                } else if (user.role === 'พนักงาน') {
                    res.redirect('/homeU');
                } else {
                    // Handle other roles or redirect to a default page
                    res.redirect('/default');
                }
            } else {
                handleAuthenticationFailure(res);
            }
        } else {
            handleAuthenticationFailure(res);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

function handleAuthenticationFailure(res) {
    res.send(`
        <script>
            alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
            window.location.href = '/login';
        </script>
    `);
}


// const bcrypt = require('bcrypt');
// const User = require('../models/User');

// module.exports = (req, res) => {
//     const { username, password } = req.body
//     User.findOne({username:username}).then((user) =>{
//         console.log(user)
//         if(user){
//             let cmp = bcrypt.compare(password, user.password).then((match)=>{
//                 if(match){
//                     req.session.userId = user._id;
//                     res.redirect('/home')
//                 }else{
//                     res.redirect('/login')
//                 }
//             })
//         }else{
//             res.redirect('/login')
//                 }
//             })
// }
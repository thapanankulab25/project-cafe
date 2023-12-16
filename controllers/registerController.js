module.exports = (req, res)=>{
    let username =""
    let password = ""
    let firstname =""
    let lastname = ""
    let email = ""
    let phone =""
    let data = req.flash('data')[0]

    if(typeof data != 'undefined'){
        username=data.username
        password=data.password
        firstname=data.firstname
        lastname=data.lastname
        email=data.email
        phone=data.phone
    }
res.render('register',{
errors: req.flash('validationErrors'),
username: username,
password: password,
email: email,
firstname: firstname,
lastname: lastname,
phone: phone,
})

}
const express = require('express');
const app = express()
const ejs = require('ejs');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const flash = require('connect-flash');
const path = require('path');


require('dotenv').config();
const db = mongoose.connection;
db.on('error',(error)=>console.log(error));
db.once('open',()=>console.log('Database Already'))

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(expressSession({
    secret: "node secret", 
    saveUninitialized: true,
    resave: false,
 })
 );

 app.set('view engine','ejs')

 app.use((req,res,next)=>{
    res.locals.message = req.session.message;
    delete req.session.massage;
    next();
});

//require
const indexController = require('./controllers/indexController')
const loginController = require('./controllers/loginController')
const loginUserController = require('./controllers/loginUserController')
const logoutController = require('./controllers/logoutController')
const homeController = require('./controllers/homeController')
const errorController = require('./controllers/errorController')
const productController = require('./controllers/productController')
const employeeController = require('./controllers/employeeController')
const index_productController = require('./controllers/index_productController')
const orderController = require('./controllers/orderController')
const rawController = require('./controllers/rawController')
const productUController = require('./controllers/productUController');
const rawUController = require('./controllers/rawUController');
const homeUController = require('./controllers/homeUController');
const editproductUController  = require('./controllers/editproductUController');
const editprofileUController  = require('./controllers/editprofileUController');
const orderUController = require('./controllers/orderUController');

mongoose.Promise = global.Promise;
//connectdatabase
mongoose.connect('mongodb+srv://nicekrubma10:kulab12345@cluster0.uqjxafb.mongodb.net/?retryWrites=true&w=majority',
{useNewUrlParser: true})


app.use(express.static('public'))
app.use(flash())


global.loggedIn = null
app.use("*",(req,res,next)=>{
    loggedIn = req.session.userId
    next()
})

//middleware
const redirectAuth = require('./middleware/redirectAuth')
const authMiddleware = require('./middleware/authMiddleware')

//get
// app.get('/', indexController)
app.get('/index',indexController)
app.get('/', loginController)
app.get('/home',authMiddleware,homeController)
app.get('/login', redirectAuth,loginController)
app.get('/employee',authMiddleware,employeeController)
app.post('/user/login', redirectAuth,loginUserController)
app.get('/error',errorController)
app.get('/logout',logoutController)
app.get('/index_product',authMiddleware,index_productController)
app.get('/product',authMiddleware,productController)
app.get('/order',authMiddleware,orderController)
app.get('/raw',authMiddleware,rawController)
app.get('/orderU',authMiddleware,orderUController)

app.post('products/editU',authMiddleware,editproductUController)

app.get('/editproductU',authMiddleware,editproductUController)
app.get('/editprofileU',authMiddleware,editprofileUController)

//get user
app.get('/rawU',authMiddleware,rawUController)
app.get('/homeU',authMiddleware,homeUController)
app.get('/productU',authMiddleware,productUController)
// app.get('/editproductU',authMiddleware,productUController)



//Api add Products
const products = require('./routes/products')
app.use('/products',products);

//Api add User
const users = require('./routes/users')
app.use('/users',users);

//Api add Raw
const raws = require('./routes/raws')
app.use('/raws',raws);

app.listen(3000,() => {
    console.log("App listening on port 3000")
})


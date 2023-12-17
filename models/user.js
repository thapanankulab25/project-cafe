const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const moment = require('moment-timezone')

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    firstname:{
        type: String,
        required: true,
    },
    lastname:{
        type: String,
        required:  true,
    },
    email:{
        type: String,
        required:true,
    },
    phone:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
    },
    image:{
        type: String,
    },
    created:{
        type: Date,
        required: true,
        default: () => moment().tz('Asia/Bangkok').toDate(),
    },
    });
    UserSchema.pre('save', function(next)  {
        const user = this

        bcrypt.hash(user.password, 10).then(hash=>{
            user.password = hash
            next()
        }).catch(error =>{
            console.error(error)
        })
    });
    
    module.exports = mongoose.model('User',UserSchema)

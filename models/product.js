const mongoose = require('mongoose');
const moment = require('moment-timezone')

const ProductSchema = new mongoose.Schema({
    productname: String,
    type: String,
    price: Number,
    //description:String,
    image: String,
    created:{
        type: Date,
        required: true,
        default: () => moment().tz('Asia/Bangkok').toDate(),
    },
});

module.exports = mongoose.model('Product', ProductSchema);


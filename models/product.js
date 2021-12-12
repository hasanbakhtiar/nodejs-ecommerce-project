const mongoose = require('mongoose');

// Product Schema
const ProductShema = mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    slug:{
        type: String
    },
    desc:{
        type: String,
        require: true
    },
    category:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
    image:{
        type: Number,
        require: true
    }
});

const Product = module.exports = mongoose.model('Product', ProductShema);
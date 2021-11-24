const mongoose = require('mongoose');

// Page Schema
const PageShema = mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    slug:{
        type: String
    },
    content:{
        type: String,
        require: true
    },
    sorting:{
        type: Number,
        require: true
    },
    
});

const Page = module.exports = mongoose.model('Page', PageShema);
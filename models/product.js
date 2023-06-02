// require mongoose because we'll be making a mongoose model in this file
const mongoose = require('mongoose');

//make Schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy']
    }
})

//compile our model
const Product = mongoose.model('Product', productSchema);

//export
module.exports = Product;



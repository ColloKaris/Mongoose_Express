// require mongoose because we'll be making a mongoose model in this file
const mongoose = require('mongoose');
const {Schema} = mongoose;

//make Schema
const productSchema = new Schema({
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
    },
    farm: {
        type: Schema.Types.ObjectId,
        ref: 'Farm'
    }
})

//compile our model
const Product = mongoose.model('Product', productSchema);

//export
module.exports = Product;



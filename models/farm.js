// Define our farm model
const mongoose = require('mongoose');
const Product = require('./product')
const {Schema} = mongoose;


// Create our farm Schema
const farmSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String
    },
    email: {
        type: String,
        required:true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
})

// Creating a Mongoose Middleware
farmSchema.post('findOneAndDelete', async function(farm) {
    if(farm.products.length){
        const res = await Product.deleteMany({_id: {$in: farm.products}});
        console.log(res);
    }
})

// Create our farm models
const Farm = mongoose.model('Farm', farmSchema);
//export the farm model
module.exports = Farm;
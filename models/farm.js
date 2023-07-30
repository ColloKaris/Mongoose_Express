// Define our farm model
const mongoose = require('mongoose');
const {Schema} = mongoose;

// Create our farm Schema
const farmSchema = new Schema({
    name:{
        type: String,
        required: [true, "Farm must have a name"]
    },
    city: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email required']
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
})

// Create our farm models
const Farm = mongoose.model('Farm', farmSchema);
//export the farm model
module.exports = Farm;
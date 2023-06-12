// Require express
const express = require('express');
const app = express();
const path = require('path');
// Connect to Mongoose
const mongoose = require("mongoose");

//import the model created in product.js in the models folder
const Product = require('./models/product');

mongoose.connect("mongodb://127.0.0.1:27017/farmStand")
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO ERROR!!!");
    console.log(err);
  });


// set up our views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//add a basic route
app.get('/products', async (req,res) => {
    const products = await Product.find({})
    res.render('products/index', {products})
})

app.get('/products/:id', async (req,res) => {
  const {id} = req.params;
  const product = await Product.findById(id);
  console.log(product);
  res.render('products/show', {product})
})


app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000")
})

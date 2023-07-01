// Require express
const express = require('express');
const app = express();
const path = require('path');
// Connect to Mongoose
const mongoose = require("mongoose");
const methodOverride = require("method-override")


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

//middleware to parse the reqeuest body from post requests
app.use(express.urlencoded({extended: true}))

app.use(methodOverride('_method'))

//add a basic route
app.get('/products', async (req,res) => {
    const products = await Product.find({})
    res.render('products/index', {products})
})

// serve the form to create a new product
// we don't need to do anything asynchronous here
app.get('/products/new', (req,res) => {
  res.render('products/new')
})

//route where the form to create a new product will be submitted
app.post('/products', async (req,res) => {
  //creating the new product in MongodDB
  const newProduct = new Product(req.body)
  await newProduct.save();
  //console.log(newProduct)
  res.redirect(`/products/${newProduct._id}`)
})

app.get('/products/:id', async (req,res) => {
  const {id} = req.params;
  const product = await Product.findById(id);
  //console.log(product);
  res.render('products/show', {product})
})

//Update products - gets the product we want to update
app.get('/products/:id/edit', async (req,res) => {
  const {id} = req.params;
  const product = await Product.findById(id);
  res.render('products/edit', {product})
})

//Route to handle the updating - where we send the data to update
app.put('/products/:id', async(req,res) => {
  // logic to updtate the product using Mongoose
  const {id} = req.params
  // updating by passing the entire request body
  const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
  res.redirect(`/products/${product._id}`)
})




app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000")
})


//chagnes buana
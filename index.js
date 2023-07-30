// Require express
const express = require('express');
const app = express();
const path = require('path');
// Connect to Mongoose
const mongoose = require("mongoose");
const methodOverride = require("method-override")


//import the model created in product.js in the models folder
const Product = require('./models/product');

// import the farm model
const Farm = require('./models/farm')

mongoose.connect("mongodb://127.0.0.1:27017/farmStandTake2")
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO ERROR!!!");
    console.log(err);
  });


const categories = ['fruit', 'vegetable', 'dairy', 'baked goods']

// set up our views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware to parse the reqeuest body from post requests
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

/**
 * Farm routes
 */
app.get('/farms', async (req,res) => {
  const farms = await Farm.find({});
  res.render('farms/index', { farms })
})
app.get('/farms/new', (req,res) => {
  res.render('farms/new')
})
app.get('/farms/:id', async (req, res) => {
  const farm = await Farm.findById(req.params.id).populate('products');
  res.render('farms/show', { farm })
})

app.post('/farms', async (req, res) => {
  const farm = new Farm(req.body)
  await farm.save()
  res.redirect('/farms')
  //res.send(req.body)
})

/**
 * Route to create a product within a farm
 */
// GET Route
app.get('/farms/:id/products/new', async (req, res) => {
  const { id } = req.params;
  const farm = await Farm.findById(id)
  res.render('products/new', { categories, farm })
})

// POST Route
app.post('/farms/:id/products', async (req,res) => {
  const { id } = req.params;
  const farm = await Farm.findById(id)
  const { name, price, category} = req.body;
  const product =  new Product({ name, price, category});
  farm.products.push(product);
  product.farm = farm;
  await farm.save();
  await product.save()
  res.redirect(`/farms/${id}`)
})
/**
 * Route to Delete a Farm
 */
app.delete('/farms/:id', async(req, res) => {
  const farm = await Farm.findByIdAndDelete(req.params.id);
  
  res.redirect('/farms');
})




/**
 * PRODUCT ROUTES
 */
//add a basic route
app.get('/products', async (req,res) => {
    const {category} = req.query;
    if(category){
      const products = await Product.find({category: category})
      res.render('products/index', {products, category})
    } else {
      const products = await Product.find({})
      res.render('products/index', {products, category: 'All'})
    }    
})

// serve the form to create a new product
// we don't need to do anything asynchronous here
app.get('/products/new', (req,res) => {
  res.render('products/new', { categories })
})

//route where the form to create a new product will be submitted
app.post('/products', async (req,res) => {
  //creating the new product in MongodDB
  const newProduct = new Product(req.body)
  await newProduct.save();
  //console.log(newProduct)
  res.redirect(`/products/${newProduct._id}`)
})

// Show a single product
app.get('/products/:id', async (req,res) => {
  const {id} = req.params;
  const product = await Product.findById(id).populate('farm', 'name');
  console.log(product);
  res.render('products/show', {product})
})

//Update products - gets the product we want to update
app.get('/products/:id/edit', async (req,res) => {
  const {id} = req.params;
  const product = await Product.findById(id);
  res.render('products/edit', { product, categories})
})

//Route to handle the updating - where we send the data to update
app.put('/products/:id', async(req,res) => {
  // logic to updtate the product using Mongoose
  const {id} = req.params
  // updating by passing the entire request body
  const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
  res.redirect(`/products/${product._id}`)
})

// Route to handle deletion
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  // method we will use to delete is findByIDAndDelete()
  const deletedProduct = await Product.findByIdAndDelete(id);
  res.redirect('/products');
})




app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000")
})
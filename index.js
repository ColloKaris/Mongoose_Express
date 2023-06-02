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



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//add a basic route
app.get('/dog', (req,res) => {
    res.send('WOOF!!')
})


app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000")
})

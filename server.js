const express = require('express');
const connectDB = require('./config/db');
const Product = require('./Models/Product');
const cors = require('cors');
const app = express();

//Comment the below line if your not connecting to DB
connectDB();

app.use(cors());
//Initialize middleware
app.use(express.json({ extended: false })); // for application/json
app.use(express.urlencoded({ extended: true })); //for forms

app.get('/',(req,res)=>res.send('API is running'));

//Define routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>console.log(`Server started on PORT ${PORT}`));

// Get all products from mongoDB
app.get('/api/products', (req,res) => {
    Product.find()
      .then((result) => {
          res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });


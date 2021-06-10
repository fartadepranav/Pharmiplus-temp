const express = require('express');
const connectDB = require('./config/db');
const Product = require('./Models/Product');
const Order = require('./Models/Orders');
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

  
  // Add new Orders to the DB
  app.post('/api/getOrders',(req,res) => {
    let data = req.body;
    let user = data.userID;
    let product = data.product;
    let status = data.status;
    console.log(user,product,status);
    const order = new Order(
      {
        userID: user,
        product: product,
        status: status
      }
    );

    order.save()
        .then((results) => {
          res.send(results);
          console.log(results);
        })
        .catch((err) => {
          console.log(err);
        });
  })

  // Get all orders from mongoDB
app.get('/api/orders', (req,res) => {
  Order.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});


//Update order
app.post('/api/orderupdate', (req,res)=>{
   let orderId = req.body.orderID;
   Order.update({_id:orderId},{'status':'cancelled'},{upsert:true})
      .then((results)=>console.log(results));
})

const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },

    product: [{
        name: String,
        price: Number,
        quantity: Number
    }],

    status: String,
    date: {
        type: Date,
        default:Date.now
    }
});

const Order = mongoose.model('orders',OrderSchema);
module.exports = Order;
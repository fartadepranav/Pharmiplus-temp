const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    category: String,
    dosage: String,
    stock: Number,
    image: String,
    price: String,
    date: {
        type: Date,
        default:Date.now
    }
});

const Product = mongoose.model('products',ProductSchema);
module.exports = Product;
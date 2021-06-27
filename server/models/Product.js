const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide product name']
    },
    price: {
        type: Number,
        required: [true, 'Please provide product price']
    },
    stock: {
        type: Number,
        required: [true, 'Please provide product stock']
    },
    image: [
        {
            public_id: {
                type: String,
                default: ''
            },
            url: {
                type: String,
                default: ''
            }
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('product', ProductSchema);
const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    title: String,
    description: String,
    image: String,
    price: Number,
    quantity: Number,
    idCostumer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = model("Product", ProductSchema);
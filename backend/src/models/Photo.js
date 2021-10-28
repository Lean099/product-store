const { Schema, model } = require('mongoose')

const PhotoSchema = new Schema({
    idCostumer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    idProduct: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    imageURL: String,     
    public_id: String 
})

module.exports = model('Photo', PhotoSchema)
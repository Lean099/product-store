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
    imageURL: String,     // Esta es la url que nos da cloudinary donde se guarda la img
    public_id: String   // Este es el id unico o nombre unico que nos da cloudinary
})

module.exports = model('Photo', PhotoSchema)
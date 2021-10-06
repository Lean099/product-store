const { Schema, model } = require('mongoose');

const UpdateSchema = new Schema({
    name: String,
    lastname: String,
    avatar: String,
    phone: String,
    dni: String,
    adress: String,
    idProducts: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
})

module.exports = model("User", UpdateSchema);
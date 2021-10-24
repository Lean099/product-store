const { Schema, model, Types } = require('mongoose');

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
    }],
    shopFeedback: [
        {
            payment_id: String,
            preference_id: String,
            status: String,
            payment_type: String,
            merchant_order_id: String
        }
    ]
})

module.exports = model("User", UpdateSchema);
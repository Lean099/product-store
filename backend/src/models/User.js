const { Schema, model, Types } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    name: String,
    lastname: String,
    password: String,
    email: String,
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

UserSchema.statics.hashPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

UserSchema.pre('save', async function(next){
    const usuario = this;
    usuario.password = await this.constructor.hashPassword(usuario.password);
    next();
})

UserSchema.pre('findOneAndUpdate', async function(next){
    // Obtener el objeto `_update` que contiene los cambios
    const update = this.getUpdate(); // Obtener el objeto de actualización

    if (update.password) {
        update.password = await this.model.hashPassword(update.password);
    }

    // Continuar con la operación de actualización
    next();
})

UserSchema.methods.validatePassword = async function(password){
    const usuario = this;
    const compare = await bcrypt.compare(password, usuario.password);
    return compare;
}

module.exports = model("User", UserSchema);
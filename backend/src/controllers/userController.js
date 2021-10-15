const Product = require('../models/Product')
const User = require('../models/User')
const Photo = require('../models/Photo')

const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const userController = {}

userController.getUser = async (req, res)=>{
    const user = await User.findOne({email: req.params.id})
    res.json({user: user})
}

userController.updateUser = async (req, res)=>{
    const {name, lastname, phone, dni, adress, email} = req.body
    const result = await cloudinary.v2.uploader.upload(req.file.path)
    const user = await User.findOneAndUpdate({email: req.params.id}, {$set: {avatar: result.url, name: name, lastname: lastname, phone: phone, dni: dni, adress: adress}})
    const newAvatar = new Photo({
        idCostumer: user._id,
        idProduct: '',
        imageURL: result.url,
        public_id: result.public_id
    })
    await newAvatar.save()
    if(req.file){
        await Photo.findOneAndDelete({imageURL: user.avatar})
    }
    res.json({message: 'User updated Successfully'})
}

userController.deleteUser = async (req, res)=>{
    // Borrara el usuario junto con toda la informacion relacionada (compras, ventas, imagenes)
}

module.exports = userController
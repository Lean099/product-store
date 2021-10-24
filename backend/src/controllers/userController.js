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
    const user = await User.findOne({_id: req.params.id})
    res.json({user: user})
}

userController.updateUser = async (req, res)=>{
    const {name, lastname, phone, dni, adress, email} = req.body
    if(req.file){
        const result = await cloudinary.v2.uploader.upload(req.file.path)
        const user = await User.findOneAndUpdate({_id: req.params.id}, {avatar: result.url, name: name, lastname: lastname, phone: phone, dni: dni, adress: adress})
        const newAvatar = new Photo({
            idCostumer: user._id,
            idProduct: '',  // Es un avatar no un producto, no confundir
            imageURL: result.url,
            public_id: result.public_id
        })
        await newAvatar.save()
        await Photo.findOneAndDelete({imageURL: user.avatar})
    }else{
        await User.findOneAndUpdate({_id: req.params.id}, {name: name, lastname: lastname, phone: phone, dni: dni, adress: adress})
    }
    
    res.json({message: 'User updated Successfully'})
}

userController.updateUserLoginData = async (req, res) =>{
    const {email, password} = req.body
    await User.findOneAndUpdate({_id: req.params.id}, {email: email, password: password})
    res.json({message: 'Updated login data'})
}

userController.deleteUser = async (req, res)=>{
    // Borrara el usuario junto con toda la informacion relacionada (compras, ventas, imagenes)
    const userDeleted = await User.findOneAndDelete({_id: req.params.id})
    await Product.deleteMany({idCostumer: userDeleted._id})
    const photosUser = await Photo.find({idCostumer: userDeleted._id})
    photosUser.forEach(async photo => await cloudinary.v2.uploader.destroy(photo.public_id))
    await Photo.deleteMany({idCostumer: userDeleted._id})
    res.json({message: 'User deleted Successfully, as well as their products and photos'})
}

module.exports = userController
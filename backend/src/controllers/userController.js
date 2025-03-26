const Product = require('../models/Product')
const User = require('../models/User')
const Photo = require('../models/Photo')

const deleteTempFiles = require('../config/deleteFiles')
const {validatePassword, hashUpdatedPassword} = require('../config/hashPassword')

const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const userController = {}

userController.createUser = async (req, res)=>{
    const {name, lastname, email, password} = req.body;
    try {
        let avatarUrl = null;
        let publicId = null;

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, { folder: 'product-store' });
            avatarUrl = result.secure_url;
            publicId = result.public_id;
        }

        const user = await User.create({
            name,
            lastname,
            email,
            password,
            avatar: avatarUrl,
            phone: null,
            dni: null,
            address: null
        });

        if (avatarUrl) {
            const avatar = new Photo({
                idCostumer: user._id,
                idProduct: null,
                imageURL: avatarUrl,
                public_id: publicId
            });
            await avatar.save();
        }

        await user.save();
        
        if (req.file) deleteTempFiles();

        res.json('User created');

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Error creating user');
    }
}

userController.login = async (req, res)=>{
    const {email, password} = req.body
    const user = await User.findOne({ email: email })
    const validationResult = await user.validatePassword(password)
    res.json({
        message: validationResult ? 'user successfully logged in' : 'credentials do not match',
        logged: validationResult,
        user: validationResult ? user : null
    })
}

userController.getUser = async (req, res)=>{
    const user = await User.findOne({_id: req.params.id})
    res.json({user: user})
}

userController.updateUser = async (req, res)=>{
    const {name, lastname, phone, dni, adress} = req.body
    if(req.file){
        const result = await cloudinary.uploader.upload(req.file.path, {folder: 'product-store'})
        const user = await User.findOneAndUpdate({_id: req.params.id}, {avatar: result.url, name: name, lastname: lastname, phone: phone, dni: dni, adress: adress})
        const newAvatar = new Photo({
            idCostumer: user._id,
            idProduct: null,
            imageURL: result.url,
            public_id: result.public_id
        })
        await newAvatar.save()
        if(user.avatar){
            const oldAvatar = await Photo.findOneAndDelete({imageURL: user.avatar}, {select: 'public_id'})
            cloudinary.uploader.destroy(oldAvatar.public_id)
        }
        deleteTempFiles()
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
    const userDeleted = await User.findOneAndDelete({_id: req.params.id})
    console.log(userDeleted)
    await Product.deleteMany({idCostumer: userDeleted._id})
    const photosUser = await Photo.find({idCostumer: userDeleted._id})
    photosUser.forEach(async photo => await cloudinary.uploader.destroy(photo.public_id))
    await Photo.deleteMany({idCostumer: userDeleted._id})
    res.json({message: 'User deleted Successfully, as well as their products and photos'})
}

userController.deleteAvatar = async (req, res)=>{
    console.log(req.params.id)
    const avatar = await Photo.findOneAndDelete({idCostumer: req.params.id }, {select: 'public_id'})
    console.log(avatar)
    cloudinary.uploader.destroy(avatar.public_id)
    await User.findByIdAndUpdate(req.params.id, {
        avatar: null
    })
    res.json({
        message: 'deleted'
    })
}

module.exports = userController
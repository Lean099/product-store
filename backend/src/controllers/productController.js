const Product = require('../models/Product')
const User = require('../models/User')
const Photo = require('../models/Photo')

const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const productController = {}

productController.newProduct = async (req, res)=>{
    const user = await User.findOne({_id: req.params.id})
    const {title, description, image, price, quantity} = req.body
    
    const result = await cloudinary.v2.uploader.upload(req.file.path)
    console.log(result)
    
    const product = await Product.create({
        title: title,
        description: description,
        image: result.url,
        price: price,
        quantity: quantity,
        idCostumer: user._id
    })
    const productSaved = await product.save()
    await User.findOneAndUpdate({_id: req.params.id}, {$set: {idProducts: product._id}})

    const newPhoto = new Photo({
        idCostumer: '',
        idProduct: productSaved._id,
        imageURL: result.url,
        public_id: result.public_id
    })
    await newPhoto.save()
    
    res.json({message: 'Product created'})
}

productController.getProduct = async (req, res)=>{
    const product = await Product.findOne({_id: req.params.id})
    res.json({product: product})
}

productController.updateProduct = async (req, res)=>{
    const {title, description, image, price, quantity} = req.body
    
    const result = await cloudinary.v2.uploader.upload(req.file.path)
    console.log(result)
    
    const productBeforeUpdated = await Product.findOneAndUpdate({_id: req.params.id}, {$set: {title: title, description: description, image: result.url, price: price, quantity: quantity}})
    const newPhoto = new Photo({
        idCostumer: productBeforeUpdated.idCostumer,
        idProduct: req.params.id,
        imageURL: result.url,
        public_id: result.public_id
    })
    await newPhoto.save()
    res.json({message: 'Product Updated'})
}

productController.deleteProduct = async (req, res)=>{
    const productAndUser = await Product.findOne({_id: req.params.id}).populate('idCostumer', {
        _id: 1,
        idProducts: 1
    })

    await Product.findOneAndDelete({_id: req.params.id})
    await User.findOneAndDelete({_id: productAndUser.idCostumer}, {$pull: {idProducts: req.params.id}})
    res.json({message: 'Product Deleted'})
}

module.exports = productController
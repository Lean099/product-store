const Product = require('../models/Product')
const User = require('../models/User')
const Photo = require('../models/Photo')
const fs_extra = require('fs-extra')
const axios = require('axios')

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
    
    const product = await Product.create({
        title: title,
        description: description,
        image: result.url,
        price: price,
        quantity: quantity,
        idCostumer: user._id
    })
    const productSaved = await product.save()
    await User.findOneAndUpdate({_id: req.params.id}, {$push: {idProducts: product._id}})

    const newPhoto = new Photo({
        idCostumer: user._id,
        idProduct: productSaved._id,
        imageURL: result.url,
        public_id: result.public_id
    })
    await newPhoto.save()
    await fs_extra.unlink(req.file.path)
    res.json({message: 'Product created'})
}

productController.getAllProducts = async (req, res)=>{
    const products = await Product.find()
    res.json({products: products})
}

productController.getProduct = async (req, res)=>{
    const product = await Product.findOne({_id: req.params.id})
    res.json({product: product})
}

productController.getAllProductsCostumer = async (req, res)=>{
    try {
        const allProducts = await Product.find({idCostumer: req.params.id})
        res.json({product: allProducts})
    } catch (error) {
        console.log(error)
    }
    
}

productController.updateProduct = async (req, res)=>{
    const {title, description, image, price, quantity} = req.body
    
    const checkFile = async ()=>{
        if(req.file){
            const result = await cloudinary.v2.uploader.upload(req.file.path)
            return result
        }else{
            return
        }
    }

    const resultImgUploaded = await checkFile()

    if(req.file){   
        const productBeforeUpdated = await Product.findOneAndUpdate({_id: req.params.id}, {title: title, description: description, image: resultImgUploaded.url, price: price, quantity: quantity})   
        const newPhoto = new Photo({
            idCostumer: productBeforeUpdated.idCostumer,
            idProduct: req.params.id,
            imageURL: resultImgUploaded.url,
            public_id: resultImgUploaded.public_id
        })
        await newPhoto.save()
        const photoBeforeDeleted = await Photo.findOneAndDelete({imageURL: productBeforeUpdated.image})
        await cloudinary.v2.uploader.destroy(photoBeforeDeleted.public_id)
    }else{
        await Product.findOneAndUpdate({_id: req.params.id}, {title: title, description: description, price: price, quantity: quantity})
    }
    
    res.json({message: 'Product Updated'})
}

productController.deleteProduct = async (req, res)=>{
    const productAndUser = await Product.findOne({_id: req.params.id}).populate('idCostumer', {
        _id: 1,
        idProducts: 1
    })

    await Product.findOneAndDelete({_id: req.params.id})
    await User.findOneAndUpdate({_id: productAndUser.idCostumer}, {$pull: {idProducts: req.params.id}})
    const photoBeforeDelete = await Photo.findOneAndDelete({idProduct: req.params.id})
    await cloudinary.v2.uploader.destroy(photoBeforeDelete.public_id)
    res.json({message: 'Product Deleted'})
}

module.exports = productController
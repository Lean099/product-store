const Product = require('../models/Product')
const User = require('../models/User')
const Photo = require('../models/Photo')
const fs_extra = require('fs-extra')

const deleteTempFiles = require('../config/deleteFiles')

const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const productController = {}

productController.newProduct = async (req, res)=>{
    const {title, description, price, quantity} = req.body
    try {
        const user = await User.findOne({_id: req.params.id})
        let imageUrl = null;
        let publicId = null;
        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path, { folder: 'product-store' });
            imageUrl = result.secure_url;
            publicId = result.public_id;
        }
        
        const product = new Product({
            title: title,
            description: description,
            image: imageUrl,
            price: price,
            quantity: quantity,
            idCostumer: user._id
        })

        if(imageUrl){
            const imageProduct = new Photo({
                idCostumer: user._id,
                idProduct: product._id,
                imageURL: imageUrl,
                public_id: publicId
            })
            await imageProduct.save();
        }

        await product.save()
        await User.findOneAndUpdate({_id: req.params.id}, {$push: {idProducts: product._id}})

        if (req.file) deleteTempFiles();

        res.json('Product created');

        
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).send('Error creating product');
    }
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
    const {title, description, price, quantity} = req.body
    try {
        let imageUrl = null;
        let publicId = null;
        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path, { folder: 'product-store' });
            imageUrl = result.secure_url;
            publicId = result.public_id;
            const photoBeforeDeleted =  await Photo.findOneAndDelete({idProduct: req.params.id})
            await cloudinary.uploader.destroy(photoBeforeDeleted.public_id)
            deleteTempFiles();
        }
            
        const updatedProduct = await Product.findOneAndUpdate({_id: req.params.id}, {title, description, image: req.file ? imageUrl : undefined, price, quantity}, {new: true})
        await Photo.create({
            idCostumer: updatedProduct.idCostumer,
            idProduct: updatedProduct._id,
            imageURL: imageUrl ? imageUrl : undefined,
            public_id: publicId ? publicId : undefined
        })
    
        res.json({
            message: 'Updated product',
            product: updatedProduct
        })
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send('Error updating product');
    }
}

productController.deleteProduct = async (req, res)=>{
    try {
        const deletedProduct = await Product.findOneAndDelete({_id: req.params.id})
        await User.findOneAndDelete({_id: req.params.id}, {$pull: {idProducts: req.params.id}})
        if(deletedProduct.image){
            const photoBeforeDeleted = await Photo.findOneAndDelete({idProduct: req.params.id})
            await cloudinary.uploader.destroy(photoBeforeDeleted.public_id)
        }
        res.json({message: 'Product Deleted'})
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send('Error deleting product');
    }
}

module.exports = productController
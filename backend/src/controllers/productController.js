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

productController.testRequest = async (req, res)=>{

    const checkFile = async ()=>{
        if(req.file){
            const result = await cloudinary.v2.uploader.upload(req.file.path)
            return result
        }else{
            return
        }
    }

    const result2 = await checkFile()
    console.log(typeof result2==='undefined')

    /*const myf = async ()=>{
        if(req.file){
            console.log("Entrooo viejaaaa")
            const m = "Entro exitosamente"
            return m
        }else{
            console.log("No entro un choto") // Cuando es undefined porque no existe el .file
            try {
                const respon = await axios.get('https://jsonplaceholder.typicode.com/users')
                return respon
            } catch (error) {
                console.log(error)
            }
            
        }
    }
    let result = null;
    myf().then(resP => {
        try {
            result=resP.data
        } catch (error) {
            console.log(error)
        }
    })
    
    console.log(result)
    console.log(req.file)*/
}

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
    /* Faltaria hacer la logica cuando actualizamos la venta y el usuario no a subido una imagen sino que
    prefiere usar la imagen que uso cuando la creo, la logica cuando actualiza la imagen de la venta ya
    esta creada, faltaria testear ese req.file.path o req.file si no recibe nada que valor tiene.
    TESTEO: Cuando no se envia nada simplemente es undefined osea que la prop .file no se crea,
    cuando envian algo ese .file se crea y es un objeto, entre sus propiedades importantes esta el path
    que es la ubicacion del archivo en el servidor (carpeta upload). */
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

    //const result = await cloudinary.v2.uploader.upload(req.file.path)
    //console.log(result)
    
    //const productBeforeUpdated = await Product.findOneAndUpdate({_id: req.params.id}, {$set: {title: title, description: description, image: result.url, price: price, quantity: quantity}})
    if(req.file){   // Si esta el .file es porque actualizo la foto entonces hay que guardarla en la DB y borrar la anterior
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
    
    //await newPhoto.save()
    //const photoBeforeDeleted = await Photo.findOneAndDelete({imageURL: productBeforeUpdated.image})
    //await cloudinary.v2.uploader.destroy(photoBeforeDeleted.public_id)
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
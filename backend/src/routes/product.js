const { Router } = require('express')
const router = Router()

const {newProduct, getProduct, getAllProductsCostumer, updateProduct, deleteProduct, getAllProducts} = require('../controllers/productController')

router.route('/getAll')
    .get(getAllProducts)

router.route('/CaG/:id')
    .post(newProduct)
    .get(getAllProductsCostumer)

router.route('/singleProduct/:id')
    .get(getProduct)

router.route('/UaD/:id')
    .post(updateProduct)
    .delete(deleteProduct)


module.exports = router
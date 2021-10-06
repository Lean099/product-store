const { Router } = require('express')
const router = Router()

const {newProduct, getProduct, updateProduct, deleteProduct} = require('../controllers/productController')

router.route('/CaG/:id')
    .post(newProduct)
    .get(getProduct)

router.route('/UaD/:id')
    .post(updateProduct)
    .delete(deleteProduct)


module.exports = router
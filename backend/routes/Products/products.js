const express = require('express');
const router = express.Router();

const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, randomProducts } = require('../../controllers/productController');

// token
const { isAuthenticatedSP } = require('../../middleware/auth') 
// router.get('/products').get(getProducts);


router.route('/products').get(getProducts);
router.route('/products/random').get(randomProducts);
router.route('/product/:id').get(getSingleProduct);

// ADMIN routers
router.route('/admin/products/new').post(isAuthenticatedSP,newProduct);
router.route('/admin/product/:id')
.put(isAuthenticatedSP,updateProduct)
.delete(isAuthenticatedSP,deleteProduct);



module.exports = router;
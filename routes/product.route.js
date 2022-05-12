const { Router } = require('express');
const { check } = require('express-validator');
const { createProduct, getAllProducts, deleteProduct, updateProduct } = require('../controllers/product.controller');
const { validateFields } = require('../middlewares/validateFields');

const router = Router();

// create product
router.post('/create', [
        check('name', 'the name is required').not().isEmpty(),
        check('office', 'the office branch is required').not().isEmpty(),
        check('price', 'the price is required').not().isEmpty(),
        check('stock', 'the stock is required').not().isEmpty()
    ],
    validateFields,
    createProduct
);

// get products
router.get('/', getAllProducts);

// delete product
router.delete('/:id', deleteProduct);

// update product
router.put('/:id', [
        check('name', 'the name is required').not().isEmpty(),
        check('office', 'the office branch is required').not().isEmpty(),
        check('price', 'the price is required').not().isEmpty(),
        check('stock', 'the stock is required').not().isEmpty()
    ],
    validateFields,
    updateProduct)

module.exports = router;
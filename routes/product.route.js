const { Router } = require('express');
const { check } = require('express-validator');
const { createProduct, findAllProducts, deleteProduct, updateProduct, findByOffice, findOneProduct } = require('../controllers/product.controller');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/jwt-validate');

const router = Router();

// create product
router.post('/create', [
        check('name', 'the name is required').not().isEmpty(),
        check('office', 'the office branch is required').not().isEmpty(),
        check('price', 'the price is required').not().isEmpty(),
        check('stock', 'the stock is required').not().isEmpty()
    ],
    validateFields,
    validateJWT,
    createProduct
);

// get products
router.get('/', validateJWT, findAllProducts);

// get products by office
router.get('/office', validateJWT, findByOffice);

// delete product
router.delete('/:id', validateJWT, deleteProduct);

// update product
router.put('/:id', [
        check('name', 'the name is required').not().isEmpty(),
        check('price', 'the price is required').not().isEmpty()
    ],
    validateFields,
    validateJWT,
    updateProduct)

router.get('/:id', findOneProduct);    

module.exports = router;
const { Router } = require('express');
const { check } = require('express-validator');
const { createMovement, updateMovement, findAllMovements, confirmMovement } = require('../controllers/movement.controller');
const { validateFields } = require('../middlewares/validateFields');

const router = Router();

// create movement
router.post('/create', [
    check('isOut', 'isOut is required').not().isEmpty(),
    check('user', 'user is required').not().isEmpty(),
    check('products.*.product', 'product is required').not().isEmpty(),
    check('products.*.quantity', 'quantity has to be a number').isNumeric()
    ],
    validateFields,
    createMovement);

// update movement
router.put('/:id', [
    check('isOut', 'isOut is required').not().isEmpty(),
    check('user', 'user is required').not().isEmpty(),
    check('products.*.product', 'product is required').not().isEmpty(),
    check('products.*.quantity', 'quantity has to be a number').isNumeric()
],
    validateFields,
    updateMovement);

// find all movements
router.get('/', findAllMovements);

// confirm movement
router.put('/confirm/:id', [
    check('isOut', 'isOut is required').not().isEmpty(),
    check('products.*.product', 'product is required').not().isEmpty(),
    check('products.*.quantity', 'quantity has to be a number').isNumeric(),
    check('isConfirmed', 'isConfirmed is required').not().isEmpty()
],
    validateFields,
    confirmMovement);

// delete movement (put or delete?)

module.exports = router;
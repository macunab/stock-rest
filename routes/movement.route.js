const { Router } = require('express');
const { check } = require('express-validator');
const { createMovement, updateMovement, findAllMovements, confirmMovement } = require('../controllers/movement.controller');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/jwt-validate');

const router = Router();

// create movement
router.post('/create', [
    check('isOut', 'isOut is required').not().isEmpty(),
    check('office', 'office is required').not().isEmpty(),
    check('user', 'user is required').not().isEmpty()
    ],
    validateFields,
    validateJWT,
    createMovement);

// update movement
router.put('/:id', [
    check('isOut', 'isOut is required').not().isEmpty(),
    check('office', 'office is required').not().isEmpty(),
    check('user', 'user is required').not().isEmpty()
],
    validateFields,
    validateJWT,
    updateMovement);

// find all movements
router.get('/', validateJWT, findAllMovements);

// confirm movement
router.put('/confirm/:id', [
    check('isOut', 'isOut is required').not().isEmpty(),
    check('products', 'product is required').not().isEmpty(),
    check('isConfirmed', 'isConfirmed is required').not().isEmpty()
],
    validateFields,
    validateJWT,
    confirmMovement);

// delete movement (put or delete?)

module.exports = router;
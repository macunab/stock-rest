const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, updateUser, toggleUser, findAllUsers } = require('../controllers/user.controller');
const { validateFields } = require('../middlewares/validateFields');

const router = Router();

// create user
router.post('/create', [
    check('name', 'the name is required').not().isEmpty(),
    check('email').isEmail().withMessage('it has to be a valid email'),
    check('password').isLength({ min: 5 }).withMessage('must be at least 5 chars long')
        .matches(/\d/).withMessage('must contain a number')
    ],
    validateFields,
    createUser);

// update user
router.put('/:id', [
    check('name', 'the name is required').not().isEmpty(),
    check('email').isEmail().withMessage('it has to be a valid email'),
    check('password').isLength({ min: 5 }).withMessage('must be at least 5 chars long')
        .matches(/\d/).withMessage('must contain a number'),
    check('permissionLevel').not().isEmpty().withMessage('authorityes is required')        
],
    validateFields,
    updateUser);

// disabled user
router.put('/toggle/:id', [
    check('isActive', 'the is active boolean is required').not().isEmpty()
],
    validateFields,
    toggleUser);

// find all users
router.get('/', findAllUsers);

module.exports = router;
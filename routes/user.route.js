const { Router } = require('express');
const { check } = require('express-validator');
const { createUser } = require('../controllers/user.controller');
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
router.put();

// disabled user
router.put();

// find all users
router.get();

module.exports = router;
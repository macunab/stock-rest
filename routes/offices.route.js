const { Router } = require('express');
const { check } = require('express-validator');
const { createOffice, getAllOffices, deleteOffice, updateOffice } = require('../controllers/officeBranch.controller');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/jwt-validate');

const router = Router();

// create office
router.post('/create',[
    check('name', 'the name is required').not().isEmpty(),
    check('email', 'it has to be a valid email').isEmail()
],
    validateFields,
    validateJWT,
    createOffice);

// find all offices    
router.get('/', validateJWT, getAllOffices);

// delete office
router.put('/:id/disabled', validateJWT, deleteOffice);

// update office
router.put('/:id', [
    check('name', 'the name is required').not().isEmpty(),
    check('email', 'it has to be a valid email').isEmail()
],
    validateFields,
    validateJWT,
    updateOffice);

module.exports = router;
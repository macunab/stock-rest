const { Router } = require('express');
const { check } = require('express-validator');
const { createOffice, getAllOffices, deleteOffice, updateOffice } = require('../controllers/officeBranch.controller');
const { validateFields } = require('../middlewares/validateFields');

const router = Router();

// create office
router.post('/create',[
    check('name', 'the name is required').not().isEmpty(),
    check('email', 'it has to be a valid email').isEmail()
],
    validateFields,
    createOffice);

// find all offices    
router.get('/', getAllOffices);

// delete office
router.put('/:id/disabled', deleteOffice);

// update office
router.put('/:id', [
    check('name', 'the name is required').not().isEmpty(),
    check('email', 'it has to be a valid email').isEmail()
],
    validateFields,
    updateOffice);

module.exports = router;
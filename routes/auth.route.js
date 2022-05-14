const { Router } = require('express');
const { userLogin, renewToken } = require('../controllers/auth.controller');
const { validateJWT } = require('../middlewares/jwt-validate');
const { validateFields } = require('../middlewares/validateFields');

const router = Router();

router.post('/', [
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    validateFields
],
    userLogin);

router.get('/renew', validateJWT, renewToken);


module.exports = router;
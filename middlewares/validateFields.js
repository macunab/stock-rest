const { ValidationResult } = require('express-validator');

const validateFields = ( req, res, next ) => {
    const errors = ValidationResult( req );
    if( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    next();
}

module.exports = validateFields;
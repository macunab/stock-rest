const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },  
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    permissionLevel: {
        type: ['ADMIN', 'EMPLOYEE'],
        required: true,
        default: 'EMPLOYEE'
    }
},
    { versionKey: false });

module.exports = model('User', UserSchema);


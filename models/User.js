const { Schema, model } = required('mongoose');

const UserSchema = Schema({
    isActive: {
        type: Boolean,
        required: true,
        default: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    auth: {
        type: String,
        required: true,
        default: 'EMPLOYEE'
    }
});

module.exports = model('User', UserSchema);


const { Schema, model } = require('mongoose');

const OfficeBranchSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    isEnabled: {
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = model('OfficeBranch', OfficeBranchSchema);
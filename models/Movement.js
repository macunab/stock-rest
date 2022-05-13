const { Schema, model } = require('mongoose');

const MovementSchema = Schema({
    type: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
},
{ timestamps: true, versionKey: false });

module.exports = model('Movement', MovementSchema);
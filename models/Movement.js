const { Schema, model } = require('mongoose');

/** isOut : false when is in movement */
const MovementSchema = Schema({
    isOut: {
        type: Boolean,
        required: true
    },
    office: {
        type: Schema.Types.ObjectId,
        ref: 'OfficeBranch'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    isConfirmed: {
        type: Boolean,
        required: true,
        default: false,
    },
    notes: {
        type: String
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            required: true
        }
    }]
},
{ timestamps: true, versionKey: false });

module.exports = model('Movement', MovementSchema);
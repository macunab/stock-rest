const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        required: true
    },
    office: {
        type: Schema.Types.ObjectId,
        ref: 'OfficeBranch'
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
},
{ timestamps: true });

module.exports = model('Product', ProductSchema);
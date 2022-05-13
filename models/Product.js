const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        required: true
    },
    office: {
        type: Schema.Types.ObjectId,
        ref: 'OfficeBranch',
        require: true
    },
    description: {
        type: String,
        required: false
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
{ timestamps: true, versionKey: false });

module.exports = model('Product', ProductSchema);
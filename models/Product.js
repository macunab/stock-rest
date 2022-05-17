const { type } = require('express/lib/response');
const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    stockOffices: [
        {
            office: {
                type: Schema.Types.ObjectId,
                ref: 'OfficeBranch'
            },
            stock: {
                type: Number,
                default: 0,
            }
        }
    ]
},
{ timestamps: true, versionKey: false });

module.exports = model('Product', ProductSchema)
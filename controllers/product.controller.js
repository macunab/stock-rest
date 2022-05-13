const Product = require("../models/Product")
const { request } = require('express');

// crear producto nuevo
const createProduct = async( req, res ) => {

    try {
        const dbProduct = new Product( req.body );
        await dbProduct.save();
        res.status(200).json({
            ok: true,
            msg: 'product created successfully'
        });
    } catch( err ) {
        res.status(401).json({
            ok: false,
            msg: 'An error occurred during product creation'
        });
    }

}

// editar producto existente
const updateProduct = ( req, res ) => {

    const { id } = req.params;
    try {
        Product.findByIdAndUpdate(id, req.body, (err, result) => {
            if(err) {
                console.log(err);
            } else {
                console.log(result);
            }
        });
        res.status(200).json({
            ok: true,
            msg: 'successfully updated product'
        });
    } catch( err ) {
        res.status(401).json({
            ok: true,
            msg: 'An error ocurred during product updated'
        });
    }
}

// eliminar producto existente
const deleteProduct = async ( req = request, res ) => {

    const { id } = req.params;
    try {
        await Product.deleteOne({ _id: id });
        res.status(200).json({
            ok: true,
            msg: 'product removed successfully'
        });
    } catch( err ) {
        res.status(401).json({
            ok: false,
            msg: 'An error ocurred during product delete'
        });
    }

}

// consultar todos los productos
const getAllProducts = async ( req = request, res ) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            products
        });
    } catch( err ) {
        res.status(401).json({
            ok: false,
            msg: 'Error trying to get all products'
        });
    }
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts
}
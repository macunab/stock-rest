const Product = require("../models/Product")
const { request } = require('express');
const OfficeBranch = require("../models/OfficeBranch");

// crear producto nuevo
const createProduct = async( req, res ) => {

    const { office, stock, name, price, description } = req.body;
    const so = [];
    try {
        const dbProduct = new Product( {name, price, description} );
        const offices = await OfficeBranch.find({});
        offices.forEach(item =>{
            const id = item._id;
            if(id == office) {
                so.push({office, stock});
            } else {
                so.push({ office: id, stock: 0 });
            }
        });
        dbProduct.stockOffices = so;
        await dbProduct.save();
        res.status(200).json({
            ok: true,
            uid: dbProduct._id,
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
const updateProduct = async ( req, res ) => {

    const { id } = req.params;
    try {
        await Product.findByIdAndUpdate(id, req.body, (err, result) => {
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
const findAllProducts = async ( req = request, res ) => {

    try {
        const values = await Product.find({});
        res.status(200).json({
            values
        });
    } catch( err ) {
        res.status(401).json({
            ok: false,
            msg: 'Error trying to get all products'
        });
    }
}

const findByOffice = async (req, res) => {

    const { office } = req.body;
    try {
        const values = await Product.find({ 'stockOffices.office': office });
        // const products = await Product.find({ 'stockOffices.office': office }, "stockOffices.$"); // projection in mongoose
        res.status(200).json({
            values
        });
    } catch(err) {
        res.status(401).json({
            ok: false,
            msg: 'Error trying to get products by office'
        });
    }
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    findAllProducts,
    findByOffice
}
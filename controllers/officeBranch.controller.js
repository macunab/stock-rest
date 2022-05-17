const { loadProductsNewOffice } = require("../helpers/stock");
const OfficeBranch = require("../models/OfficeBranch");


// create office branch
const createOffice = async ( req, res ) => {

    try {
        const dbOffice = new OfficeBranch( req.body );
        await dbOffice.save();
        await loadProductsNewOffice(dbOffice);
        res.status(200).json({
            ok: true,
            msg: 'office created successfully'
        });
    } catch( err ) {
        res.status(401).json({
            ok: false,
            msg: 'An error ocurred during office creation'
        });
    }
}

// update office branch
const updateOffice = async ( req, res ) => {

    const { id } = req.params;
    try {
        await OfficeBranch.findByIdAndUpdate(id, req.body);
        res.status(200).json({
            ok: true,
            msg: 'office updated successfully'
        });
    } catch( err ) {
        res.status(401).json({
            ok: false,
            msg: 'An error ocurred during offices update'
        })
    }

}

// delete office branch
const deleteOffice = async ( req, res ) => {
    const { id } = req.params;
    try {
        await OfficeBranch.findByIdAndUpdate( id, { isEnabled: false});
        res.status(200).json({
            ok: true,
            msg: 'office delete successfully'
        });
    } catch( err ) {
       res.status(400).json({
            ok: false,
            msg: 'An error ocurred during office delete'
       });
    }

}

// get all offices branch
const getAllOffices = async ( req, res ) => {

    try {
        const offices = await OfficeBranch.find({});
        res.status(200).json({
            offices
        });
    } catch( err ) {
        res.status(400).json({
            ok: false,
            msg: 'An error ocurred during find all offices'
        });
    }
}

module.exports = {
    createOffice,
    updateOffice,
    deleteOffice,
    getAllOffices
}
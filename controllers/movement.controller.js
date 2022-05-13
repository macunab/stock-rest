const changeStock = require("../helpers/stock");
const Movement = require("../models/Movement");

/**
 * 
 */
const createMovement = async ( req, res ) => {
    try {
        const dbMovement = new Movement(req.body);
        await dbMovement.save();
        res.status(200).json({
            ok: true,
            msg: 'movement successfully created'
        });
    } catch(err) {
        res.status(400).json({
            ok: false,
            msg: 'an error ocurred while trying create a movement'
        });
    }
    
}

/** Update movement esta en veremos */
const updateMovement = async ( req, res ) => {

    const { id } = req.params;
    const { isConfirmed } = req.body;
    if(isConfirmed) {
        return res.status(401).json({
            ok: false,
            msg: 'cant update confirmed movement'
        });
    }
    try {
        await Movement.findByIdAndUpdate(id, req.body);
        res.status(200).json({
            ok: true,
            msg: 'movement successfully updated'
        });
    } catch(err) {
        res.status(401).json({
            ok: false,
            msg: 'An error ocurred while trying update a movement'
        });
    }
}

/** Una vez confirmado un movimiento se cargan todos las modificaciones de stock en 
 *  los productos seleccionados.
 */
const confirmMovement = ( req, res ) => {

    const { id } = req.params;
    const { isConfirmed, isOut, products } = req.body;
    try{
        changeStock(products, isOut);
        await Movement.findByIdAndUpdate(id, { isConfirmed });
    } catch(err) {
        res.status(200).json({
            ok: false,
            msg: 'An error ocurred while trying confirm a movement'
        });
    }

}

const deleteMovement = ( req, res ) => {

}

module.exports = {
    createMovement,
    updateMovement,
    deleteMovement,
    confirmMovement
}
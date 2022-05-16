const changeStock = require("../helpers/stock");
const Movement = require("../models/Movement");

/** create movement */
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
 * Me tope con un bug al usar un callback en findByIdAndUpdate, en ese caso es necesario 
 * utilizar .then() para visualizar la data.
 */
const confirmMovement = async ( req, res ) => {

    const { id } = req.params;
    const { isConfirmed, isOut, products } = req.body;
    try{
        await changeStock(products, isOut);
        await Movement.findByIdAndUpdate(id, { isConfirmed: isConfirmed });
        res.status(200).json({
            ok:true,
            msg: 'movement confirmed successfully'
        });
    } catch(err) {
        res.status(400).json({
            ok: false,
            msg: err
        });
    }

}

const findAllMovements = async ( req, res ) => {

    try {
        const movements = await Movement.find();
        res.status(200).json({
            movements
        });
    } catch(err) {
        res.status(400).json({
            ok: false,
            msg: 'An error ocurred while trying find all movements'
        });
    }
}

/** No se si eliminar los movements o directamente deshabilitar un movement
 * la segunda opcion implicaria hacer un controller en el que le pase un parametro
 * para identificar si quiero un tipo de movimiento habilitado o no.
 */
const deleteMovement = ( req, res ) => {

}

module.exports = {
    createMovement,
    updateMovement,
    deleteMovement,
    confirmMovement,
    findAllMovements
}
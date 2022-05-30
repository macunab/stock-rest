const changeStock = require("../helpers/stock");
const Movement = require("../models/Movement");
const Product = require("../models/Product");

/** create movement */
const createMovement = async ( req, res ) => {
    const {office, products, isOut, isConfirmed } = req.body;
    try {
        const dbMovement = new Movement(req.body);
        if( products[0].product.stockOffices === undefined ){
            const product = await Product.findById(products[0].product)
            products[0].product = product;
        }
        // true when create movement of only one product and optional in other cases
        if(isConfirmed){
            await changeStock.changeStockOffice(products, isOut, office);
        }
        await dbMovement.save();
        res.status(200).json({
            ok: true,
            uid: dbMovement._id,
            msg: 'movement successfully created'
        });
    } catch(err) {
        console.log(err);
        res.status(400).json({
            ok: false,
            msg: 'an error ocurred while trying create a movement' + err
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

/** 
 * Confirmar el movimiento y realizar el cambio sobre el stock en base a la sucursal 
 * a la que pertenece el movimiento.
 */
const confirmMovement = async ( req, res ) => {

    const { id } = req.params;
    const { isConfirmed, isOut, products, office } = req.body;
    try{

        await changeStock.changeStockOffice(products, isOut, office);
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
        const values = await Movement.find().populate('products.product');
        res.status(200).json({
            values
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
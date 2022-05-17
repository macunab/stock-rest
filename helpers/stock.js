const Product = require("../models/Product")

/** type: true IN / false OUT */
const changeStockOffice = (products, isOut, office) => {

    //console.log('ENTRO' + JSON.stringify(products));
    products.forEach(item => {
        let stock = item.product.stockOffices.filter( stockBranch => stockBranch.office == office )[0].stock;
        console.log(stock);
        if(!isOut) {
            stock += item.quantity;
        } else {
            stock -= item.quantity;
            if(stock < 0 ){
                stock = 0;
            }
        }

        Product.findOneAndUpdate({'_id': item.product._id, 'stockOffices.office': office}, {
            '$set': {
                'stockOffices.$.stock': stock 
            }
        }, function(err, doc) {
            if(err) { console.log(err) }
            else { console.log( doc ) }
        });
    }); 

}

module.exports = {
    changeStockOffice
};
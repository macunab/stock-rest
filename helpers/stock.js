const Product = require("../models/Product")

/** type: true IN / false OUT */
const changeStockOffice = (products, isOut, office) => {

    products.forEach(item => {
        let stock = item.product.stockOffices.filter( stockBranch => stockBranch.office == office._id )[0].stock;
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

// load products when creating a new officeBranch
const loadProductsNewOffice = (office) => {

    Product.updateMany({}, {
        '$push': {
            'stockOffices': { office, stock: 0 }
        }
    }, function(err, doc) {
        if(err) { console.log(err) }
        else { console.log(doc) }
    });
}

module.exports = {
    changeStockOffice,
    loadProductsNewOffice
};
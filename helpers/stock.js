const Product = require("../models/Product")

/** type: true IN / false OUT */
const changeStock = (products, isOut) => {
   
    console.log( products );
    products.forEach(item => {
        if(!isOut) {
            item.product.stock += item.quantity;
        } else {
            item.product.stock -= item.quantity;
            if(item.product.stock < 0 ){
                item.product.stock = 0;
            }
        }
        Product.findByIdAndUpdate(item.product._id, item.product, function(err, docs) {
            if(err){
                console.log('ERROR' + err);
            } else {
                console.log('EL PRODUCTO ES' + docs);
            }
        });
    }); 
}

module.exports = changeStock;
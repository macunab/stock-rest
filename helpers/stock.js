const Product = require("../models/Product")

/** type: true IN / false OUT */
const changeStock = (products, isOut) => {
    products.forEach(item => {
        if(!isOut) {
            item.product.stock += item.quantity;
        } else {
            item.product.stock -= item.quantity;
            if(item.product.stock < 0 ){
                item.product.stock = 0;
            }
        }
        Product.findByIdAndUpdate(item.product._id, item.product);
    }); 
}

module.exports = changeStock;
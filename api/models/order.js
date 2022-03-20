const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        require:true
    },
    qty:{
        type:Number,
        default:1
    }
})

Order = mongoose.model("Order",orderSchema);

module.exports = Order;

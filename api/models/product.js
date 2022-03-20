const mongoose = require("mongoose");

const prodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price:{
        type:Number,
        required:true
    },
    productImage:{
        type:String,
        required:true
    }
})

//creting collection.............

const Product = new mongoose.model("Product", prodSchema);

module.exports = Product;

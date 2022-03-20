const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename: function(req,file,cb){
        cb(null, new Date().toDateString()+file.originalname);
    }
})

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true);
    }else{
        cb(new Error('pdf'),false);
    }
}

const upload = multer({
    storage:storage,
    limits:{
        fileSize:1024 * 1024 * 5
    },
    fileFilter : fileFilter
});

const Product = require("../models/product");

router.get("/",(req,res)=>{
    Product.find().then((doc)=>{
        res.status(200).send(doc);
    })
})

router.get("/:productID",(req,res)=>{
    const id = req.params.productID;
    Product.findById({_id:id}).then((doc)=>{
        if(doc){
            res.status(200).json(doc);
        }else{
            return res.status(404).json({msg:"No Entry."});
        }
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({error:err});
    })
})

router.post("/", upload.single('productImage'),(req,res)=>{
    // console.log(req.file);
    const prod = new Product({
        name:req.body.name,
        price:req.body.price,
        productImage:req.file.path
    })
    prod.save().then((result)=>{
        console.log(result);
    }).catch((err)=>{
        console.log(err);
    });
    res.status(200).send({
        msg:"It's done.",
        createdProd:prod
    })
})

router.patch("/:productID", (req, res) => {
    const id = req.params.productID;
    Product.update({_id:id},{$set : {
        name:req.body.newName,
        price:req.body.newPrice
    }}).then(()=>{
        res.status(200).json({msg:"Updated"});
    })
});

router.delete("/:productID", (req, res) => {
    const id = req.params.productID;
    Product.deleteOne({_id:id}).then(()=>{
        console.log("Deleted.");
        res.status(200).json({msg:"Deleted"});
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports = router;

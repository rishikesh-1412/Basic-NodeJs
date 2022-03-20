const express = require('express');

const router = express.Router();

const mongoose = require("mongoose");
const Order = require("../models/order");

router.get("/", (req, res) => {
    Order.find().populate("product").then((doc) => {
        res.status(200).send(doc);
    })
})

router.get("/:orderID", (req, res) => {
    const id = req.params.orderID;
    if (id == 1) {
        res.status(200).send("Its ID 1.");
    } else if (id == 2) {
        res.status(200).send("Its ID 2.");
    } else {
        res.status(200).send("Its wrong ID.");
    }
})

router.post("/", (req, res) => {
    const order = new Order({
        qty:req.body.qty,
        product:req.body.productID
    })
    order.save().then(()=>{
        res.status(200).send({msg:"DONE"});
    })
})

router.patch("/:orderID", (req, res) => {
    res.status(200).send("PATCH request.");
})

router.delete("/:orderID", (req, res) => {
    res.status(200).send("DELETE request.");
})

module.exports = router;

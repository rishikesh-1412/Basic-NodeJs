const mongoose = require('mongoose');

const DB = process.env.DATABASE

mongoose.connect(DB).then(() => {
    console.log("Database Connection Successfull!!")
}).catch((err) => {
    console.log(err)
})

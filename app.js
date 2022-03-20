//dotenv.............
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const express = require('express');
const app = express();

app.use(express.json());
app.use('/uploads',express.static('uploads'));

require("./dbconnection/conn");

const morgan = require('morgan');
app.use(morgan('dev'));

// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());


//Handling CORS error...............
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization");
    if(req.method == "OPTIONS"){
        res.header("Access-Control-Allow-Methods","PUT,POST,DELETE,GET,PATCH");
        return res.status(200).json({});
    }
    next();
})

const productRouter = require('./api/routes/products');
const orderRouter = require("./api/routes/orders");

const PORT = process.env.PORT || 3000;

app.use('/products',productRouter);
app.use("/orders",orderRouter);

app.get("/",(req,res)=>{
    res.status(200).send("It Works!");
})

app.use((req,res,next)=>{
    const error = new Error('Not Found.');
    error.status=404;
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })
})

app.listen(PORT,()=>{
    console.log(`Server is running on port : ${PORT}.`)
})

require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

const testRouter = require('./routes/test');
const authRouter = require('./routes/auth');
const Test = require("./models/test");
const {createtest,updatetest} = require("./controllers/test");
const errorHandlerMiddleware = require('./middlewares/error-handler');
const notFound = require('./middlewares/not-found');

const connectDB = require('./db/connect');
const passport = require('passport');
app.use(express.json());
app.use(passport.initialize());
require('./config/passport');

app.get('/',(req,res)=>{
    res.send('<h1>NodeJs-API</h1>')
});

app.use('/auth',authRouter);
app.use('/boards',passport.authenticate('jwt',{session:false}),testRouter);

app.use(errorHandlerMiddleware);
app.use(notFound);
const port = 3000;

const start = async()=>{
    
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port,console.log(`server is listening on port ${port}...`))
    }catch(error){
         console.log(error);
    }
    
}

start();
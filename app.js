require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();


const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimitter = require('express-rate-limit');

const testRouter = require('./routes/test');
const authRouter = require('./routes/auth');
const Test = require("./models/test");
const {createtest,updatetest} = require("./controllers/test");
const errorHandlerMiddleware = require('./middlewares/error-handler');
const notFound = require('./middlewares/not-found');

const connectDB = require('./db/connect');
app.set('trust proxy',1);
app.use(rateLimitter({
   windowMs: 15*60 *1000,
   max : 100,
}));

const passport = require('passport');
app.use(express.json());
app.use(passport.initialize());

app.use(helmet());
app.use(cors());
app.use(xss());
require('./config/passport');
app.use('/auth',authRouter);
app.use('/boards',passport.authenticate('jwt',{session:false}),testRouter);

app.use(errorHandlerMiddleware);
app.use(notFound);

app.get('/',(req,res)=>{
    res.send('<h1>NodeJs-API</h1>')
});


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

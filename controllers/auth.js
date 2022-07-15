const User = require("../models/user");
const {BadRequestError,UnauthenticatedError} = require("../errors/bad-request") ;
const {StatusCodes} = require('http-status-codes');

const register = async function(req,res){
    const user = await User.create({...req.body});
    const token = user.createJWT();
    return res.status(StatusCodes.CREATED).json({token});
}

const login = async function(req,res){
    const {email,password} = req.body;
    if(!email || !password){
         throw new BadRequestError("please provide email/password")
    }

    const user = await User.findOne({email});
    if(!user){
         throw new UnauthenticatedError("Invalid Credientials");
    }

    const correctpass = await user.comparePassword(password);
     if(!correctpass){
       throw new UnauthenticatedError('invalid credientials');
     }

     const token = user.createJWT();

      return res.status(StatusCodes.CREATED).json({token})
}

module.exports = {login,register};
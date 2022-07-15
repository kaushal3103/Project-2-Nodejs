const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  
    email:{
        type:String,
        required:[true,'Please Provide your Email'],
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'please provide valid email'
        ],
        unique:true
    }
    ,

    password:{
        type:String,
        required:[true,'Please Provide your Password'],
        minlength:6,
    }

},
{timestamps:true});

UserSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10);
   
      this.password = await bcrypt.hash(this.password,salt);
    next();
})

UserSchema.methods.createJWT = function(){
    return jwt.sign({userId:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_LIFETIME
    })
}

UserSchema.methods.comparePassword = async function(candiatepassword){
    const correctpass = await bcrypt.compare(candiatepassword,this.password);
    return correctpass;
}


module.exports = mongoose.model('User',UserSchema)
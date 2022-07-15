const Test = require("../models/test");

const createtest = async(req,res)=>{
  const test = await Test.create(req.body);
 
  return res.status(200).json({test});
}

const updatetest = async(req,res)=>{
   const {body:{stage},params:{id:id}}=req;
   
   if(stage === 1 || stage === 2 || stage === 3 ){
    const title = await Test.updateOne({id},{$set:req.body})
 
    const result = await Test.findOne({id});

    return res.status(200).json({result});
   }
 
 return res.status(400).json({});
 
}

module.exports = {createtest,updatetest};
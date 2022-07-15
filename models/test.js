const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
    id:{type:Number,default:1,unique:true},
    title:{type:String},
    stage:{type:Number,default:1}
})

const countercollection = mongoose.model('counter',
new mongoose.Schema({id:Number}),'counter'
);

TestSchema.pre('save',async function(){
    if(this.id){
        let counter = await countercollection.findOne();
        
        if(!counter){
            counter = new countercollection({id:1})
        }else{
            counter.id++;
        }
        this.id = counter.id
        const response = await counter.save();
    }
})

module.exports = mongoose.model("Test",TestSchema);
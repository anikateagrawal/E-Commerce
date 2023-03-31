const { url } = require('inspector');
const mongoose=require('mongoose');

const schema=new mongoose.Schema({
    name:String,
    img:String,
    price:Number,
    desc:String,
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Review'
    }],
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

const model=mongoose.model('products',schema);

module.exports=model;
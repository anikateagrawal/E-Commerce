const { url } = require('inspector');
const mongoose=require('mongoose');

const schema=new mongoose.Schema({
    name:String,
    img:String,
    price:Number,
    desc:String
});

const model=mongoose.model('products',schema);

module.exports=model;
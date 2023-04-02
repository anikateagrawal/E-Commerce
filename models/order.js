const mongoose=require('mongoose');


const schema=new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products',
        required:true
    },
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

const orders=mongoose.model('order',schema);
module.exports=orders;
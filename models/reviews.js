const mongoose=require('mongoose');

const reviews=new mongoose.Schema({
    rating:Number,
    comment:String,
    username:String,
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

const review=mongoose.model('Review',reviews);
module.exports=review; 
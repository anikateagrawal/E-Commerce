const mongoose=require('mongoose');

const reviews=new mongoose.Schema({
    rating:Number,
    comment:String
});

const review=mongoose.model('Review',reviews);
module.exports=review; 
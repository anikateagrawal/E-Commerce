const mongoose=require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const schema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products'
    }]
})

schema.plugin(passportLocalMongoose);
const user=mongoose.model('User',schema);
module.exports=user;
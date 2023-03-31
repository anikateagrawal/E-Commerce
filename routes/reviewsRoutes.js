const express=require('express');
const router=express.Router();
const reviews=require('../models/reviews');
const products=require('../models/product');
const { isLoggedIn } = require('../middleware');

router.post('/products/:prdid/review',isLoggedIn,async(req,res)=>{
    const {prdid}=req.params;
    const {rating,comment}=req.body;
    const review=await reviews.create({rating,comment,creator:req.user.id});
    const product=await products.findById(prdid);
    await product.reviews.splice(0,0,review);
    await product.save();
    console.log('success');
    req.flash('message','Review added');
    res.redirect('/products/'+prdid);
})

router.delete('/products/:prdid/reviews/:rvid',isLoggedIn,async(req,res)=>{
    const {prdid,rvid}=req.params;
    await reviews.findByIdAndDelete(rvid);
    const product=await products.findById(prdid);
    product.reviews=product.reviews.filter((id)=>id!=rvid);
    await product.save();
    res.redirect('/products/'+prdid);
})

module.exports=router;
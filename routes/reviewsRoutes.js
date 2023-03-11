const express=require('express');
const router=express.Router();
const reviews=require('../models/reviews');
const products=require('../models/product');

router.post('/products/:prdid/review',async(req,res)=>{
    const {prdid}=req.params;
    const {rating,comment}=req.body;
    const review=await reviews.create({rating,comment});
    const product=await products.findById(prdid);
    await product.reviews.splice(0,0,review);
    await product.save();
    console.log('success');
    res.redirect('/products/'+prdid);
})

router.delete('/products/:prdid/reviews/:rvid',async(req,res)=>{
    const {prdid,rvid}=req.params;
    await reviews.findByIdAndDelete(rvid);
    const product=await products.findById(prdid);
    product.reviews=product.reviews.filter((id)=>id!=rvid);
    await product.save();
    res.redirect('/products/'+prdid);
})

module.exports=router;
const express=require('express');
const router=express.Router();
const product=require('../models/product');
const {isLoggedIn}=require('../middleware');

router.get('/products',async(req,res)=>{
    const products =await product.find();
    res.render('./products/product',{products});
})

router.get('/products/new',isLoggedIn,(req,res)=>{
    res.render('./products/new');
})
router.post('/products/new',isLoggedIn,async(req,res)=>{
    const {name,img,price,desc}=req.body; 
    await product.create({name,img,price,desc});
    console.log("product added");
    req.flash('message','Product added successfully');
    res.redirect('/products');
})

router.get('/products/:prdid/edit',isLoggedIn,async(req,res)=>{
    const {prdid}=req.params;
    const products=await product.findById(prdid); 
    res.render('./products/edit',{products});
})

router.get('/products/:prdid',isLoggedIn,async(req,res)=>{
    const {prdid}=req.params;
    const products=await product.findById(prdid);
    await products.populate('reviews'); 

    res.render('./products/show',{products});
})

router.patch('/products/:prdid',isLoggedIn,async(req,res)=>{
    const {prdid}=req.params;
    const {name,img,price,desc}=req.body;
    await product.findByIdAndUpdate(prdid,{name,img,price,desc});
    console.log("product updated");
    req.flash('message','updated successfully');
    res.redirect('/products/'+prdid);
})

router.delete('/products/:prdid',async(req,res)=>{
    const {prdid}=req.params;
    await product.findByIdAndDelete(prdid);
    console.log('product deleted');
    res.redirect('/products');
}) 
module.exports=router;
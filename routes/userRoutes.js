const express=require('express');
const router=express.Router();
const {isLoggedIn}=require('../middleware');
const User=require('../models/user')
const Product=require('../models/product') 

router.get('/user',isLoggedIn,(req,res)=>{
    res.render('user/userInfo');
})

router.post('/products/cart/:pid/add',isLoggedIn,async(req,res)=>{
    const uid=req.user.id;
    const {pid}=req.params;
    const user=await User.findById(uid);
    user.cart.push(pid);
    await user.save();
    req.flash('message','product successfully added to cart');
    res.redirect('/products');
})

router.get('/cart',isLoggedIn,async(req,res)=>{
    const user=req.user;
    await user.populate('cart');
    const products=user.cart;
    res.render('user/cart',{products});
})

router.delete('/products/cart/:pid',isLoggedIn,async(req,res)=>{
    const uid=req.user.id;
    const {pid}=req.params;
    const user=await User.findById(uid);
    user.cart=user.cart.filter((e)=> e!=pid);
    await user.save();
    req.flash('error','product removed from cart');
    res.redirect('/cart');
})

router.get('/myproducts',isLoggedIn,async(req,res)=>{
    const products=await Product.find({creator:req.user.id});
    res.render('user/myproducts',{products});
});

module.exports=router;

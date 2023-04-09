const express=require('express');
const router=express.Router();
const User=require('../models/user');
const passport=require('passport');

router.get('/signup',(req,res)=>{
    res.render('auth/signup');
})


router.post('/signup',async(req,res)=>{
    try{
        const {username,password,email,contact,profile}=req.body;
        const user=new User({username,email,contact,profile});
        await User.register(user,password);
        req.flash('message','you have registered successfully');
        res.redirect('/login');
    }
    catch(e){
        req.flash('message',e.message);
        res.redirect('/signup');
    } 
})

router.get('/login',(req,res)=>{
    res.render('auth/login');
})

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),(req, res) =>{
    req.flash('message','login successful');
    res.redirect('/products');
})


router.get('/logout',(req,res)=>{
    req.logout((e)=>{
        if(e){
            res.flash('error',e.message);
        }
        res.redirect('/products');
    });
})
module.exports=router;
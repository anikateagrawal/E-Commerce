const express=require('express');
const path=require('path');
const engine=require('ejs-mate');
const port=4000;
const mongoose=require('mongoose');
const productRoutes=require('./routes/productRoutes');
const methodOverride=require('method-override');
const session=require('express-session');
const cookieParser=require('cookie-parser');
const flash=require('connect-flash');
const app=express();
const seed=require('./seed');
const reviewRouter=require('./routes/reviewsRoutes');

app.use(session({
    secret:'Fastest man live',
    resave:true,
    saveUninitialized:true,
    cookie:{}
}));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.message=req.flash('message');
    next();
});

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));

app.listen(port,()=>{
    console.log("server running at port "+port);
});

app.get('/',(req,res)=>{
    res.redirect('/products');
})
app.use(reviewRouter);
app.use(productRoutes);
mongoose.set('strictQuery',true);
const dburl='mongodb+srv://Anikate7316ag:Anikate%4025@cluster0.ofjnmbo.mongodb.net/shopping-app';
mongoose.connect('mongodb+srv://Anikate7316ag:Anikate%4025@cluster0.ofjnmbo.mongodb.net/shopping-app')
.then(()=>{
    console.log('DB connected');
    seed()
}).catch((e)=>console.log(e));

setInterval(seed,24*60*60*1000);

app.use(express.static(path.join(__dirname,'public')));

app.engine('ejs',engine);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


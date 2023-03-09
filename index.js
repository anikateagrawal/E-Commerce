const express=require('express');
const path=require('path');
const engine=require('ejs-mate');
const port=4000;
const mongoose=require('mongoose');
const productRoutes=require('./routes/productRoutes');
const methodOverride=require('method-override');
const app=express();
const seed=require('./seed');

app.use(methodOverride('_method'));

app.use(express.urlencoded({extended:true}));
app.listen(port,()=>{
    console.log("server running at port "+port);
});

app.get('/',(req,res)=>{
    res.redirect('/products');
})
app.use(productRoutes);
mongoose.connect('mongodb+srv://Anikate7316ag:Anikate%4025@cluster0.ofjnmbo.mongodb.net/shopping-app')
.then(()=>{
    console.log('DB connected');
    seed(); 
}).catch((e)=>console.log(e));



app.use(express.static(path.join(__dirname,'public')));

app.engine('ejs',engine);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


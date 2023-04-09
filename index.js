require('dotenv').config();
const express=require('express');
const path=require('path');
const engine=require('ejs-mate');
const port=process.env.port;
const mongoose=require('mongoose');
const productRoutes=require('./routes/productRoutes');
const methodOverride=require('method-override');
const session=require('express-session');
const flash=require('connect-flash');
const app=express();
const seed=require('./seed'); 
const reviewRouter=require('./routes/reviewsRoutes');
const authRoutes=require('./routes/authRoutes');
var passport = require('passport');
var LocalStrategy = require('passport-local');
const User=require('./models/user')
const userRoutes=require('./routes/userRoutes');
const MongoDBStore = require('express-mongodb-session')(session);
const dburl=process.env.dbURL;

passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const store = new MongoDBStore({
    uri: dburl2,
    collection: 'mySessions'
  });
 
  store.on('error', function(error) {
    console.log(error);
  });


app.use(session({
    secret:'Fastest man live',
    resave:true,
    saveUninitialized:true,
    store:store,
    cookie:{
        httpOnly:true,
        expires:Date.now()+7*24*60*60*1000
    }
}));


app.use(flash());


app.use(passport.session());

app.use((req,res,next)=>{
    res.locals.user=req.user;
    res.locals.message=req.flash('message');
    res.locals.error=req.flash('error');
    next();
});

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));

app.listen(port,()=>{
    console.log("server running at port "+port);
});

app.get('/',(req,res)=>{
    res.render('./products/home');

    // res.send("connected");
})
app.use(reviewRouter);
app.use(productRoutes);
app.use(authRoutes);
app.use(userRoutes);

mongoose.set('strictQuery',true);


mongoose.connect(dburl2)
.then(()=>{
    console.log('DB connected');
    // seed()
}).catch((e)=>console.log(e)); 

// setInterval(seed,24*60*60*1000);

app.use(express.static(path.join(__dirname,'public')));

app.engine('ejs',engine);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


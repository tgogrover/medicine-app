//require pakages
const express=require('express');
const app=express();
const mongoose=require("mongoose");
const api_User_Signup_Route=require('./routes/signup');
const api_Login_Route=require('./routes/login');
const api_DashBoardRoute=require('./routes/dashboard');
const api_appointmentRoute=require('./routes/appointment');
const api_MedicineCreateRoute=require('./routes/medicine');
const api_MedicineToCartRoute=require('./routes/cart');
const api_MedicineToOrderRoute=require('./routes/order');

require('dotenv').config();

app.use(express.static('public'));
app.set('view engine','ejs');

//mongoose connection
mongoose.connect('mongodb://localhost:27017/Medicine_App',
{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.connection.on('error',(err)=>{
console.log(' error connecting with mongodb with'+ err)
});

mongoose.connection.on('connected',()=>{
console.log('mongodb is connected with server successfully')});

//middlewares
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 

 app.use(api_User_Signup_Route);
 app.use(api_Login_Route);
 app.use(api_DashBoardRoute);
 app.use(api_appointmentRoute);
 app.use(api_MedicineCreateRoute);
 app.use(api_MedicineToCartRoute);
 app.use(api_MedicineToOrderRoute);







app.listen(process.env.PORT,()=>{
    console.log(`server is successfully running on server ${process.env.PORT}`)
})
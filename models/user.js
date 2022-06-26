const mongoose=require('mongoose');

 const SignupSchema=new mongoose.Schema({

    Full_Name:{
        type:String,
        required:true
    },
    Mobile_Number:{
        required:true,
        type:Number,
        unique:true,
        maxlength:10,
        minlength:10
    },

    Email: {
        required:true,
        unique:true,
        type:String
    },
       
    Role:{
        type:String,
        enum:['Customers','Admin','Delivery Person'],
        default:'Customers'
    },
    Password:{
        type:String,
        required:true,
        minlength:5      
    },
   
   
 }, { timestamps: true })




 module.exports=mongoose.model('client',SignupSchema)
const mongoose=require('mongoose');
const cartSchema=new mongoose.Schema({

   UserId:{type:mongoose.Schema.Types.ObjectId,ref:'client'},
    Cart_Items:[
        {
            MedicineId:{
                type: mongoose.Schema.Types.ObjectId,ref:'Medicine'
            },
        Quantity:{
            type:Number,default:1
        },
        
    }
    ],
    
},{ timestamps: true })

module.exports=mongoose.model('cart',cartSchema)
  
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    Customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "client",
      required: true,
    },
   User_Address:{
      type:String,
     
    },
    Items: [
      {
        MedicineId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Medicine",
        },
        Quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    Order_Status: 
      {
       
          type: String,
          enum: ['Order Accepted','Dispatched','Items Picked','Out on Delivery', 'Delivered' , 'Canceled'],
          default:'Order Accepted',
      
        
        
      },
      Payment_By: 
      {
       
          type: String,
          enum: ['CARD','COD'],
          default:'COD',
      
        
        
      },
   
    Driver:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "client",
      
    },
    Total_Amount:{
      type:String,
      required:true
    }
  },
 
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);

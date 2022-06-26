const orderModel=require('../models/order');
const cartModel=require('../models/cart');
const {  validationResult } = require('express-validator');
//const { subTotal } = require('./cart');
require('dotenv').config()
//const publishableKey=process.env.PUBLISHABLE_KEY;
const secretKey=process.env.STRIPE_KEY
const stripe = require('stripe')(secretKey) 
const YOUR_DOMAIN = "http://localhost:3000";

exports.orderByCard=async(req,res)=>{
  var email=localStorage.getItem('loginEmail')
    
   
    
    try {
     
      var cart=   await cartModel.findOne({UserId:req.user._id})
      .populate("Cart_Items.MedicineId","_id Name Price ProductPictures Description")
      .exec()
      
          
      if(cart){
        const {Cart_Items}=cart
      //    console.log(Cart_Items);
         
           var array=Cart_Items.map((e)=>{
               return e.MedicineId.Price*e.Quantity
               
           })
           var sumTotal= array.reduce((total,current)=>{
               return total+=current
       
           })
          // console.log(subTotal)
        //    var quantity= Cart_Items.reduce((total,current)=>{
        //     return total.Quantity+=current.Quantity
    
        // });
        // var nameArray=Cart_Items.map((element)=>{
        // return  element.MedicineId.Name
          


        // })
     
     //   console.log(nameArray)

        //  console.log(quantityArray)
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
              {
                  price_data: {
                      currency: "inr",
                      product_data: {
                          name: "Medicines Bill",
                          images: ["https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.theconversation.com%2Ffiles%2F369567%2Foriginal%2Ffile-20201116-23-18wlnv.jpg%3Fixlib%3Drb-1.1.0%26q%3D45%26auto%3Dformat%26w%3D1356%26h%3D668%26fit%3Dcrop&imgrefurl=https%3A%2F%2Ftheconversation.com%2Feast-african-countries-should-prioritise-their-essential-medicines-for-drug-registration-149638&tbnid=DoQX_S3aTkt76M&vet=12ahUKEwi-9vKw-pb4AhWhxqACHQHyDP4QMygBegUIARDWAQ..i&docid=VjPUSkn54ugoaM&w=1356&h=668&q=medicine&ved=2ahUKEwi-9vKw-pb4AhWhxqACHQHyDP4QMygBegUIARDWAQ"],
                      },
                      unit_amount: sumTotal * 100,
                  },
                  quantity:1,
              },
          ],
          mode: "payment",
          success_url: `${YOUR_DOMAIN}/api/customer/DB_order`,
          cancel_url: `${YOUR_DOMAIN}/cancel.html`,
      });
  

  res.json({ id: session.id });

      }
       
      
    } catch (error) {

      console.log(error)
      return res.json(
        {Message:'',Error:'Something went wrong, Plese Try again Later',subTotal:''})
      
    }
   
};


exports.data_OrderWithStatus=async(req,res)=>{
  const {userAddress}=req.body;
  console.log(req.body)
    const err= validationResult(req);
    console.log(err)
    if(!err.isEmpty()){
     return res.render('orderDetails',{ Message:'',Error: err.array()[0].msg })
    }
  
  try {

     
    var cart=   await cartModel.findOne({UserId:req.user._id})
    .populate("Cart_Items.MedicineId","_id Name Price ProductPictures Description")
    .exec()
    
        
    if(cart){
      const {Cart_Items}=cart
    //    console.log(Cart_Items);
       
         var array=Cart_Items.map((e)=>{
             return e.MedicineId.Price*e.Quantity
             
         })
         var sumTotal= array.reduce((total,current)=>{
             return total+=current
     
         })
     //   console.log(subTotal)
      //    var quantity= Cart_Items.reduce((total,current)=>{
      //     return total.Quantity+=current.Quantity
  
      // });
      
      var itemArray=Cart_Items.map((element)=>{
        return {MedicineId:element.MedicineId._id,
        Quantity:element.Quantity
        }

      })
      var nameArray=Cart_Items.map((element)=>{
      return  element.MedicineId.Name
    

      })
      const Order=new orderModel({

        Customer:req.user._id,
        User_Address:userAddress,
        Items:itemArray,
        Order_Status:'Order Accepted',
        Total_Amount:sumTotal,
        Payment_By:'CARD'

      })
      if(Order){
     await   Order.save(async(err,order)=>{
          if(err) throw err;
          if(order){
            cartModel.deleteOne({UserId:req.user._id}).exec((err,orderConfirmed)=>{
              if(err){
                console.log(err)
                return res.render('orderDetails',
                {Message:'Enter Your Address Here',Error:"Something went wrong ,Please trry later"})
              }
              if(orderConfirmed){
                return res.render('orderDetails',{Message:'Order Successfully register',Error:""})
          }

            })
            
          }

      })
      }
   
     console.log(nameArray)

       //console.log(quantityArray)
     




    }
     
    
  } catch (error) {

    console.log(error)
    return res.render('orderDetails',
      {Message:'',Error:'Something went wrong, Plese Try again Later'})
    
  }

}

exports.data_OrderWithStatus_COD=async(req,res)=>{
  const {userAddress}=req.body;
  console.log(req.body)
    const err= validationResult(req);
    console.log(err)
    if(!err.isEmpty()){
     return res.render('orderDetails',{ Message:'',Error: err.array()[0].msg })
    }
  
  try {

     
    var cart=   await cartModel.findOne({UserId:req.user._id})
    .populate("Cart_Items.MedicineId","_id Name Price ProductPictures Description")
    .exec()
    
        
    if(cart){
      const {Cart_Items}=cart
    //    console.log(Cart_Items);
       
         var array=Cart_Items.map((e)=>{
             return e.MedicineId.Price*e.Quantity
             
         })
         var sumTotal= array.reduce((total,current)=>{
             return total+=current
     
         })
     //   console.log(subTotal)
      //    var quantity= Cart_Items.reduce((total,current)=>{
      //     return total.Quantity+=current.Quantity
  
      // });
      
      var itemArray=Cart_Items.map((element)=>{
        return {MedicineId:element.MedicineId._id,
        Quantity:element.Quantity
        }

      })
      var nameArray=Cart_Items.map((element)=>{
      return  element.MedicineId.Name
    

      })
      const Order=new orderModel({

        Customer:req.user._id,
        User_Address:userAddress,
        Items:itemArray,
        Order_Status:'Order Accepted',
        Total_Amount:sumTotal,
        Payment_By:'COD'

      })
      if(Order){
     await   Order.save(async(err,order)=>{
          if(err) throw err;
          if(order){
            cartModel.deleteOne({UserId:req.user._id}).exec((err,orderConfirmed)=>{
              if(err){
                console.log(err)
                return res.render('orderCOD',
                {Message:'Enter Your Address Here',Error:"Something went wrong ,Please trry later"})
              }
              if(orderConfirmed){
                return res.render('orderCOD',{Message:'Order Successfully register',Error:""})
          }

            })
            
          }

      })
      }
   
     //console.log(nameArray)

       //console.log(quantityArray)
     




    }
     
    
  } catch (error) {

    console.log(error)
    return res.render('orderDetails',
      {Message:'',Error:'Something went wrong, Plese Try again Later'})
    
  }

}

exports.getOrderStatus=async(req,res)=>{
  try {
    var email=localStorage.getItem('loginEmail')
    var order= await orderModel.find({Customer:req.user._id}).exec();
  if(order == []){
    return res.render('orderStatus',
      {Message:'',Error:'Nothing ordered by you'})

  }
  console.log(order)
  return res.render('orderStatus',
      {Message:order,Error:'',Email:email})
    
  } catch (error) {
    console.log(error)
    return res.render('orderStatus',
      {Message:'',Error:'Something went wrong,Please try again Later',Email:''})
    
  }
  


}

exports.updateOrderStatus=async(req,res)=>{
  const {_id,status}=req.body;
  const err= validationResult(req);
  //console.log(err)
  if(!err.isEmpty()){
   return res.status(400).json({
    Error: err.array()[0].msg
  })
    //res.render('orderDetails',{ Message:'',Error: err.array()[0].msg })
  }
  try {
    
    const update=await orderModel.findByIdAndUpdate({_id:_id},{Order_Status:status}).exec();
    if(update){
      console.log(update)
      res.status(201).json({
        update
      })
    }
  } catch (error) {
    
  return  res.status(400).json({
      error
    })

    
  }
}
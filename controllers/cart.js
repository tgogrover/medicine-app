const cartModel=require('../models/cart')
const {  validationResult } = require('express-validator');
const medicineModel=require('../models/medicine')



exports.addMedicinetoCarts=async(req,res)=>{
    try {
        const {id}=req.params;
        const medicine= await medicineModel.find({}).exec();
         //   console.log(medicine)
            if(medicine===[]){
               res.render('medicine',{Message:'', Error:'No medicine Available',message:''})
            }
            else{
           //  console.log(cardioDoctors)
           const { Cart_Items}= req.body;
           const cartID=cartModel.findOne({UserId:req.user._id})
         await  cartID.exec((err,cart)=>{
               if(err) {
               return    res.render('cart',{message:'',Error:'Something Went Wrong,Please try Again Later'})
               }
               if(cart){
                 
                   //id.Cart_Items.Product
                   
                  // console.log(Product)
       
                   const productID=cart.Cart_Items.find((c) => { return c.MedicineId == id})
                //   
                   if(productID){
                       parseInt
                       const evaluate=  1 +  parseInt(productID.Quantity)
                       productID.Quantity=evaluate;
                       
       
       
       cart.save(({ suppressWarning: true }),(err,data)=>{
           if(err) {
               console.log(err)
             return  res.render('medicine',{Message:'',Error:'Something Went Wrong,Medicine cannot added to cart'})
           }
              if(data){
      return  res.render('medicine',{message:'Medicine Added Successfully',Error:'',Message:medicine})
              }     
       })
                   }
                   else{
                       //console.log(cart)
                   cart.Cart_Items.push({
                      
                           MedicineId:id,
                           Quantity:1
                       
                   });
                  cart.save((err,insertData)=>{
                      console.log(insertData)
                if(err) {
                    console.log(err)
        return  res.render('medicine',{Message:medicine,Error:'Something Went Wrong,Medicine cannot added to cart',
        message:''})
                     }
                     else{
       return res.render('medicine',{message:'Medicine  added to cart successfully',Error:'',Message:medicine})
                     }
                       
                   })
                }
           }
               else{
                  
                   const cartData=new cartModel({
                       UserId: req.user._id,
                       Cart_Items:{
                        MedicineId:id,
                           Quantity:1
                       }
                   })
                  cartData.save((err,data)=>{
                       if(err) {
   return res.render('medicine',{message:'',Error:'Something Went Wrong,Medicine cannot added to cart',Message:medicine})
                       }
                       if(data){
    return  res.render('medicine',{message:'Medicine Added Successfully to cart',Error:'',Message:medicine})
                           
                       }
                   })
               }
           })
       
            }
       
       
        
    } catch (error) {
        
    }
        
    }


    exports.getCart=async(req,res)=>{
        try {
        var cart=   await cartModel.findOne({UserId:req.user._id})
.populate("Cart_Items.MedicineId","_id Name Price ProductPictures Description")
.exec()

    // if(err) {
        
    //     return res.render({Message:"",Error:'Something went Wrong ,Please Try Again Later'})
    // }
if(cart){
  //  var cartItems=cart.Cart_Items
   // console.log('ok')
   // var arrr1=[3,7,4,8,9]
     console.log(cart.Cart_Items)
     var array=cart.Cart_Items.map((e)=>{
         return e.MedicineId.Price*e.Quantity
         
     })
    //  var orderArray=cart.Cart_Items.map((element)=>{
    //     return {MedicineId:element.MedicineId._id,Quantity:element.Quantity}
    //   })
    //   console.log(orderArray);
     var sumTotal= array.reduce((total,current)=>{
         return total+=current
 
     })
    
 //return res.status(200).json({Cart:cart.Cart_Items})
 return res.render('cart',{Message:cart.Cart_Items,Error:'',subTotal:sumTotal})
    
}
if(cart == null){
    console.log(cart)
    return res.render('cart',{Message:'',Error:'No medicine in this cart', subTotal:''})

}

            
        } catch (error) {
            console.log(error)
            return res.render('cart',{Message:'',Error:'Something went wrong,please try again later',subTotal:''})
            
        }


    }

    exports.subTotal=async(req,res)=>{
        try {
        var cart=   await cartModel.findOne({UserId:req.user._id})
.populate("Cart_Items.MedicineId","_id Name Price ProductPictures Description")
.exec()

   
if(cart){
    var sum;
    var arrr1=[3,7,4,8,9]
   // console.log(cart.Cart_Items)
    var array=cart.Cart_Items.map((e)=>{
        return e.MedicineId.Price*e.Quantity
        
    })
    var sumTotal= arrr1.reduce((total,current)=>{
        return total+=current

    })
    
    // console.log(array)
    console.log(sumTotal)
 return res.status(200).json({array,sumTotal})
    
}
else{
 //   console.log()
    return res.json({mes:'ok'})

}

            
        } catch (error) {
            console.log(error)
            return res.status(400).json({message:'ok'})
            
        }


    }
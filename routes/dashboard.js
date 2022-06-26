const express=require('express');
const router=express.Router();




router.get('/api/customer/dashboard',async(req,res)=>{
    var loginUser=localStorage.getItem('loginEmail')
    res.render('dashboard',{loginUser:loginUser, Error:''})

})




module.exports=router
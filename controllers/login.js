const bcryptjs=require('bcryptjs');
const userModel=require('../models/user');
const jwt=require('jsonwebtoken');
const {  validationResult } = require('express-validator');
const doctorModel=require('../models/doctors')


//making scratch folder and storing some information(work like cache) in it 
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

exports.customerlogin=async(req,res)=>{
    try{
    const {email,password}=req.body;
    const err= validationResult(req);
    //console.log(err)
    if(!err.isEmpty()){
     return res.render('login',{ Message:'',Error: err.array()[0].msg })
    }
    else{
      const loginAccountCheck= await userModel.findOne(
        {Email:email}).exec();
         // console.log(loginAccountCheck)
         
          if(loginAccountCheck){
              const {Password,_id,Email,Full_Name,Mobile_Number,Role}=loginAccountCheck;
              if(bcryptjs.compareSync(password, Password)){
               var token = jwt.sign({_id:_id,Email:Email,Role:Role}, process.env.SECRET_KEY);
               localStorage.setItem("loginEmail",Email);
               localStorage.setItem('loginToken',token);
               localStorage.setItem('loginRole',Role);
               localStorage.setItem('loginMobile',Mobile_Number);
               
       return   res.redirect('/api/dashboard')
       }
       else{
        console.log('be')
      return     res.render('login',{Error:"Incorrect Password,Please try correct Password ",Message:''})
       }
          }
          else{
          
        return   res.render('login',{Error:"Please Signup first ",Message:''})
   
          }
    }


}catch(err){
   // console.log(err)
  return  res.render('login',{Error:"Something went wrong,please try again later ",Message:''})
     
}
       
      
};


exports.adminlogin=async(req,res)=>{
  try{
  const {email,password}=req.body;
  const err= validationResult(req);
  console.log(err)
  if(!err.isEmpty()){
    return res.status(400).json({
      Error: err.array()[0].msg 

     })

  }
  else{
    const loginAccountCheck= await userModel.findOne(
      {Email:email}).exec();
        console.log(loginAccountCheck)
       
        if(loginAccountCheck){
            const {Password,_id,Email,Full_Name,Mobile_Number,Role}=loginAccountCheck;
            if(bcryptjs.compareSync(password, Password)){
             var token = jwt.sign({_id:_id,Email:Email,Role:Role}, process.env.SECRET_KEY);
             localStorage.setItem("loginEmail",Email);
             localStorage.setItem('loginToken',token);
             localStorage.setItem('loginRole',Role);
             localStorage.setItem('loginMobile',Mobile_Number);
     return   res.status(200).json({
      Message:"Login Successfully",   Email,Mobile_Number,Full_Name
     })
     }
     else{
    return    res.status(400).json({Error:"Incorrect Password,Please try correct Password "})
     }
        }
        else{
        
      return   res.status(400).json({Error:"Please Signup first "})
 
        }
  }


}catch(err){
  console.log(err)
return  res.status(400).json({Error:"Something went wrong,please try again later "})
   
}
     
    
};


exports.doctorlogin=async(req,res)=>{
  try{
  const {email,password}=req.body;
  const err= validationResult(req);
  //console.log(err)
  if(!err.isEmpty()){
   return res.render('doctorLogin',{ Message:'',Error: err.array()[0].msg })
  }
  else{
    const loginAccountCheck= await doctorModel.findOne(
      {Email:email}).exec();
       // console.log(loginAccountCheck)
       
        if(loginAccountCheck){
            const {Password,_id,Email,Full_Name,Mobile_Number,Role,Specialization}=loginAccountCheck;
            if(bcryptjs.compareSync(password, Password)){
             var token = jwt.sign({_id:_id,Email:Email,Role:Role}, process.env.SECRET_KEY);
             localStorage.setItem("loginEmail",Email);
             localStorage.setItem('loginToken',token);
             localStorage.setItem('loginRole',Role);
             localStorage.setItem('loginMobile',Mobile_Number);
             localStorage.setItem('loginSpec',Specialization);
     return   res.redirect('/api/doctor/dashboard')
     }
     else{
      console.log("ok")
    return     res.render('doctorLogin',{Error:"Incorrect Password,Please try correct Password ",Message:''})
     }
        }
        else{
        
      return   res.render('doctorLogin',{Error:"Please Signup first ",Message:''})
 
        }
  }


}catch(err){
  //console.log(err)
return  res.render('doctorLogin',{Error:"Something went wrong,please try again later ",Message:''})
   
}
     
    
};


